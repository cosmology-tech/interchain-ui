import type { CodemodPlugin, AST } from "vue-metamorph";

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

export const vueMitosisCodeMod: CodemodPlugin = {
  type: "codemod",
  name: "vue mitosis",

  transform({
    scriptASTs,
    sfcAST,
    utils: { traverseScriptAST, traverseTemplateAST },
  }) {
    let transformCount = 0;

    // for (const scriptAST of scriptASTs) {
    //   traverseScriptAST(scriptAST, {
    //     // Convert event handlers in script
    //     visitCallExpression(path) {
    //       if (
    //         t.isMemberExpression(path.node.callee!) &&
    //         t.isIdentifier(path.node.callee.object, { name: "props" }) &&
    //         t.isIdentifier(path.node.callee.property) &&
    //         path.node.callee.property.name &&
    //         path.node.callee.property.name in eventMappings
    //       ) {
    //         const vueEvent = eventMappings[path.node.callee.property.name];
    //         if (vueEvent) {
    //           path.replaceWith(
    //             t.callExpression(t.identifier("emit"), [
    //               t.stringLiteral(vueEvent),
    //               ...path.node.arguments,
    //             ]),
    //           );
    //           transformCount++;
    //         }
    //       }
    //     },
    //   });

    //   // Add defineEmits
    //   const detectedEvents = new Set(Object.values(eventMappings));
    //   if (detectedEvents.size > 0) {
    //     const emitsArray = Array.from(detectedEvents).map((event) =>
    //       t.stringLiteral(event),
    //     );
    //     const defineEmitsStatement = t.variableDeclaration("const", [
    //       t.variableDeclarator(
    //         t.identifier("emit"),
    //         t.callExpression(t.identifier("defineEmits"), [
    //           t.arrayExpression(emitsArray),
    //         ]),
    //       ),
    //     ]);
    //     scriptAST.program.body.unshift(defineEmitsStatement);
    //     transformCount++;
    //   }
    // }

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
            console.log("isVBindNode", node);
            const containsObjectExpression =
              node.value?.type === "VExpressionContainer" &&
              node.value?.expression?.type === "ObjectExpression";

            let expression = node.value?.expression;
            let originalProperties =
              node?.value?.expression?.type === "ObjectExpression" &&
              node.value.expression.properties
                ? node.value.expression.properties
                : null;

            if (
              !containsObjectExpression ||
              !expression ||
              !originalProperties
            ) {
              return;
            }

            // Case 1: eventHandlers is in a spread operator
            const eventHandlersPropertyNested = originalProperties.find(
              (property) =>
                property.type === "SpreadElement" &&
                property.argument.type === "Identifier" &&
                property.argument.name === "eventHandlers",
            );

            const restProperties = originalProperties.filter(
              (property) =>
                property.type === "SpreadElement" &&
                property.argument.type === "Identifier" &&
                property.argument.name !== "eventHandlers",
            );

            // Remove eventHandlers from the spread operator
            if (eventHandlersPropertyNested) {
              if (node.value?.expression) {
                // @ts-ignore-next-line
                node.value.expression.properties = restProperties;
                transformCount++;
                return;
              }
            }

            // Case 2: eventHandlers is not in a spread operator but just a plain object
            // .ie v-bind="eventHandlers"
          }
        },
      });
    }

    return transformCount;
  },
};
