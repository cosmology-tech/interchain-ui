import { CodemodPlugin, builders as vueBuilders } from "vue-metamorph";
import { builders, namedTypes, visit } from "ast-types";
import { isEmpty } from "lodash";

const eventMappings = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onMouseMove: "mousemove",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onKeyPress: "keypress",
  onFocus: "focus",
  onBlur: "blur",
  onInput: "input",
  onChange: "change",
  onSubmit: "submit",
  onReset: "reset",
  onScroll: "scroll",
  onWheel: "wheel",
  onDragStart: "dragstart",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragEnter: "dragenter",
  onDragLeave: "dragleave",
  onDragOver: "dragover",
  onDrop: "drop",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTouchCancel: "touchcancel",
};

const createVOnDirective = (identifier: string) => {
  return vueBuilders.vDirective(
    vueBuilders.vDirectiveKey(vueBuilders.vIdentifier("on")),
    vueBuilders.vExpressionContainer(vueBuilders.identifier(identifier)),
  );
};

export const vueMitosisCodeMod: CodemodPlugin = {
  type: "codemod",
  name: "vue mitosis",

  transform({ scriptASTs, sfcAST, utils: { traverseTemplateAST } }) {
    let transformCount = 0;
    let didModEventHandlers = false;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          const isVBindNode =
            node.type === "VAttribute" &&
            node.directive &&
            node.key.type === "VDirectiveKey" &&
            node.key.name.type === "VIdentifier" &&
            node.key.name.name === "bind";

          if (isVBindNode) {
            const containsExpression =
              node.value?.type === "VExpressionContainer";

            let expression = node.value?.expression;

            if (!containsExpression || !expression) {
              return;
            }

            const isObjectExpression = expression.type === "ObjectExpression";

            // Case 1: eventHandlers is in a spread operator
            let originalProperties =
              node?.value?.expression?.type === "ObjectExpression" &&
              node.value.expression.properties
                ? node.value.expression.properties
                : null;

            if (isObjectExpression && originalProperties) {
              const eventHandlersPropertyIndex = originalProperties.findIndex(
                (property) =>
                  property.type === "SpreadElement" &&
                  property.argument.type === "Identifier" &&
                  property.argument.name === "eventHandlers",
              );

              const restProperties = originalProperties.filter(
                (property, index) => index !== eventHandlersPropertyIndex,
              );

              // Remove eventHandlers from the spread operator
              if (eventHandlersPropertyIndex !== -1) {
                // Nothing left to spread, remove the v-bind
                if (isEmpty(restProperties)) {
                  if (node.parent.type === "VStartTag") {
                    // Remove the v-bind
                    let newAttributes = node.parent.attributes.filter(
                      (attr) => {
                        return !(
                          attr.key.type === "VDirectiveKey" &&
                          attr.key.name.type === "VIdentifier" &&
                          attr.key.name.name == "bind" &&
                          attr.key.name.rawName == "bind"
                        );
                      },
                    );
                    const vOnWithEventHandlers =
                      createVOnDirective("eventHandlers");
                    newAttributes.push(vOnWithEventHandlers);
                    node.parent.attributes = newAttributes;
                    transformCount++;
                    didModEventHandlers = true;
                    return;
                  }
                } else if (node.value?.expression) {
                  const vOnWithEventHandlers =
                    createVOnDirective("eventHandlers");

                  // @ts-ignore-next-line
                  node.value.expression.properties = restProperties;
                  node.parent.attributes.push(vOnWithEventHandlers);
                  transformCount++;
                  didModEventHandlers = true;
                  return;
                }
              }
            }

            // Case 2: eventHandlers is not in a spread operator but just a plain object
            // .ie v-bind="eventHandlers"
            const isVExpressionContainer =
              node.value?.type === "VExpressionContainer" &&
              node.value?.expression &&
              node.value?.expression.type === "Identifier" &&
              node.value.expression.name === "eventHandlers";

            if (isVExpressionContainer) {
              const originalAttributes = node.parent.attributes;
              const eventHandlersAttributeIndex = originalAttributes.findIndex(
                (attr) => {
                  return (
                    attr.type === "VAttribute" &&
                    attr.directive &&
                    attr.value?.type === "VExpressionContainer" &&
                    attr.value?.expression?.type === "Identifier" &&
                    attr.value?.expression?.name === "eventHandlers"
                  );
                },
              );

              if (eventHandlersAttributeIndex === -1) {
                return;
              }

              const restAttributes = originalAttributes.filter(
                (attr, index) => index !== eventHandlersAttributeIndex,
              );

              const vOnWithEventHandlers = createVOnDirective("eventHandlers");

              node.parent.attributes = restAttributes;
              node.parent.attributes.push(vOnWithEventHandlers);
              transformCount++;
              didModEventHandlers = true;
              return;
            }
          }
        },
      });
    }

    for (const scriptAST of scriptASTs) {
      visit(scriptAST, {
        visitCallExpression(path) {
          const { node } = path;
          if (
            namedTypes.MemberExpression.check(node.callee) &&
            namedTypes.Identifier.check(node.callee.object) &&
            node.callee.object.name === "eventProps" &&
            namedTypes.Identifier.check(node.callee.property) &&
            node.callee.property.name === "forEach"
          ) {
            const arrowFunction = node.arguments[0];
            if (
              namedTypes.ArrowFunctionExpression.check(arrowFunction) &&
              namedTypes.Identifier.check(arrowFunction.params[0])
            ) {
              const paramName = arrowFunction.params[0].name;
              visit(arrowFunction.body, {
                visitMemberExpression(innerPath) {
                  const { node: innerNode } = innerPath;
                  if (
                    namedTypes.Identifier.check(innerNode.object) &&
                    innerNode.object.name === "props" &&
                    namedTypes.Identifier.check(innerNode.property) &&
                    innerNode.property.name === "eventName"
                  ) {
                    innerPath.replace(
                      builders.memberExpression(
                        builders.identifier("props"),
                        builders.identifier(paramName),
                        true,
                      ),
                    );
                    transformCount++;
                  }
                  this.traverse(innerPath);
                },
              });
            }
          }
          this.traverse(path);
        },
      });

      // Add defineEmits for relevant events detected in eventHandlers variable
      const detectedEvents = new Set(Object.values(eventMappings));

      if (
        detectedEvents.size > 0 &&
        scriptAST.isScriptSetup &&
        didModEventHandlers
      ) {
        const emitsArray = Array.from(detectedEvents).map((event) =>
          builders.stringLiteral(event),
        );
        const defineEmitsStatement = builders.variableDeclaration("const", [
          builders.variableDeclarator(
            builders.identifier("emit"),
            builders.callExpression(builders.identifier("defineEmits"), [
              builders.arrayExpression(emitsArray),
            ]),
          ),
        ]);

        scriptAST.body.unshift(defineEmitsStatement);
        transformCount++;
      }
    }

    return transformCount;
  },
};
