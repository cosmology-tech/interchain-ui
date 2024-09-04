// @ts-check
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
module.exports = function vueCompilerPlugin() {
  return {
    json: {
      // Happens after getting json
      post: (json) => {
        json = fixCleanupRefAst(json);
        return json;
      },
    },
    code: {
      // Happens before formatting
      pre: (codeStr) => {
        return [
          fixVueClassName,
          fixVueEventHandlers,
          // Hello
        ].reduce((acc, transform) => {
          acc = transform(acc);
          return acc;
        }, codeStr);
      },
    },
  };
};

// Export for testing
// @ts-ignore
module.exports.fixVueEventHandlers = fixVueEventHandlers;

function fixCleanupRefAst(ast) {
  if (ast.hooks && ast.hooks.onUnMount) {
    const onUnMountCode = ast.hooks.onUnMount.code;

    let updatedCode = onUnMountCode;

    if (
      onUnMountCode &&
      /if\s*\(\s*typeof\s+cleanupRef\.value\s*===\s*["']function["']\s*\)/.test(
        onUnMountCode,
      )
    ) {
      // Case 1: With braces

      const ast = parse(onUnMountCode, {
        sourceType: "module",
        plugins: ["typescript"],
      });

      traverse(ast, {
        IfStatement(path) {
          const { test, consequent } = path.node;
          if (
            t.isBinaryExpression(test) &&
            t.isUnaryExpression(test.left) &&
            t.isMemberExpression(test.left.argument) &&
            t.isIdentifier(test.left.argument.object) &&
            test.left.argument.object.name === "cleanupRef" &&
            t.isIdentifier(test.left.argument.property) &&
            test.left.argument.property.name === "value" &&
            t.isStringLiteral(test.right) &&
            test.right.value === "function"
          ) {
            const newConsequent = t.blockStatement([
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.identifier("cleanupRef"),
                    t.identifier("value"),
                  ),
                  [],
                ),
              ),
            ]);
            path.node.consequent = newConsequent;
          }
        },
      });

      updatedCode = generate(ast).code;
    }

    ast.hooks.onUnMount.code = updatedCode;
  }
  return ast;
}

function fixVueEventHandlers(codeStr) {
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

  // Match the entire content, including multiple template and script sections
  const fullMatch = codeStr.match(
    /([\s\S]*<template[^>]*>)([\s\S]*?)(<\/template>[\s\S]*)/,
  );

  if (!fullMatch) {
    return codeStr; // If there's no match, return the original code
  }

  const [, beforeTemplate, templateContent, afterTemplate] = fullMatch;
  const scriptMatch = afterTemplate.match(/<script[^>]*>([\s\S]*?)<\/script>/);

  if (!scriptMatch) {
    return codeStr; // If there's no script section, return the original code
  }

  const scriptContent = scriptMatch[1];

  const ast = parse(scriptContent, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const detectedEvents = new Set();

  // Add all possible events to detectedEvents
  Object.values(eventMappings).forEach((event) => detectedEvents.add(event));

  traverse(ast, {
    // Detect events in JSX attributes
    JSXAttribute(path) {
      const name = path.node.name;
      if (t.isJSXIdentifier(name) && name.name && name.name in eventMappings) {
        const vueEvent = eventMappings[name.name];
        detectedEvents.add(vueEvent);
        name.name = `@${vueEvent}`;
      }
    },
    // Detect events in object properties or variable declarations
    Property(path) {
      if (
        t.isIdentifier(path.node.key) &&
        path.node.key.name &&
        path.node.key.name in eventMappings
      ) {
        detectedEvents.add(eventMappings[path.node.key.name]);
      }
    },
    VariableDeclarator(path) {
      if (t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach((element) => {
          if (t.isStringLiteral(element) && element.value in eventMappings) {
            detectedEvents.add(eventMappings[element.value]);
          }
        });
      }
    },
    // Merged CallExpression visitor
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.object, { name: "props" }) &&
        t.isIdentifier(path.node.callee.property) &&
        path.node.callee.property.name &&
        path.node.callee.property.name in eventMappings
      ) {
        const vueEvent = eventMappings[path.node.callee.property.name];
        if (vueEvent) {
          path.replaceWith(
            t.callExpression(t.identifier("emit"), [
              t.stringLiteral(vueEvent),
              ...path.node.arguments,
            ]),
          );
        }
      } else if (
        t.isIdentifier(path.node.callee, { name: "computed" }) &&
        path.node.arguments.length === 1 &&
        t.isArrowFunctionExpression(path.node.arguments[0])
      ) {
        const functionBody = path.node.arguments[0].body;
        if (t.isBlockStatement(functionBody)) {
          // Check if this computed property is for event handlers
          const isEventHandlers = functionBody.body.some(
            (node) =>
              t.isVariableDeclaration(node) &&
              node.declarations.some((decl) =>
                t.isIdentifier(decl.id, { name: "handlers" }),
              ),
          );

          if (isEventHandlers) {
            const newBody = t.blockStatement([
              t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.identifier("handlers"),
                  t.objectExpression([]),
                ),
              ]),
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.callExpression(
                      t.memberExpression(
                        t.identifier("Object"),
                        t.identifier("entries"),
                      ),
                      [t.identifier("eventMappings")],
                    ),
                    t.identifier("forEach"),
                  ),
                  [
                    t.arrowFunctionExpression(
                      [
                        t.arrayPattern([
                          t.identifier("propName"),
                          t.identifier("eventName"),
                        ]),
                      ],
                      t.blockStatement([
                        t.ifStatement(
                          t.binaryExpression(
                            "in",
                            t.identifier("propName"),
                            t.identifier("props"),
                          ),
                          t.blockStatement([
                            t.expressionStatement(
                              t.assignmentExpression(
                                "=",
                                t.memberExpression(
                                  t.identifier("handlers"),
                                  t.identifier("eventName"),
                                  true,
                                ),
                                t.arrowFunctionExpression(
                                  [t.identifier("event")],
                                  t.blockStatement([
                                    t.variableDeclaration("const", [
                                      t.variableDeclarator(
                                        t.identifier("propEventHandler"),
                                        t.memberExpression(
                                          t.identifier("props"),
                                          t.identifier("propName"),
                                          true,
                                        ),
                                      ),
                                    ]),
                                    t.ifStatement(
                                      t.binaryExpression(
                                        "===",
                                        t.unaryExpression(
                                          "typeof",
                                          t.identifier("propEventHandler"),
                                        ),
                                        t.stringLiteral("function"),
                                      ),
                                      t.blockStatement([
                                        t.expressionStatement(
                                          t.callExpression(
                                            t.identifier("propEventHandler"),
                                            [t.identifier("event")],
                                          ),
                                        ),
                                      ]),
                                    ),
                                    t.expressionStatement(
                                      t.callExpression(t.identifier("emit"), [
                                        t.identifier("eventName"),
                                        t.identifier("event"),
                                      ]),
                                    ),
                                  ]),
                                ),
                              ),
                            ),
                          ]),
                        ),
                      ]),
                    ),
                  ],
                ),
              ),
              t.returnStatement(t.identifier("handlers")),
            ]);

            functionBody.body = newBody.body;
          }
        }
      }
    },
  });

  // Add defineEmits
  if (detectedEvents.size > 0) {
    const emitsArray = Array.from(detectedEvents).map((event) =>
      t.stringLiteral(event),
    );
    const defineEmitsStatement = t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier("emit"),
        t.callExpression(t.identifier("defineEmits"), [
          t.arrayExpression(emitsArray),
        ]),
      ),
    ]);

    // Insert defineEmits at the beginning of the script
    ast.program.body.unshift(defineEmitsStatement);
  }

  const updatedScriptContent = generate(ast).code;

  // Update template event bindings
  let updatedTemplateContent = templateContent;

  // Handle v-bind with or without eventHandlers, including custom components
  updatedTemplateContent = updatedTemplateContent.replace(
    /<([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*)([^>]*?)v-bind=["'](\{[^}]+\})["']([^>]*?)>|v-bind=["'](\{[^}]+\})["']|v-bind=["']([^"']+)["']/g,
    (
      match,
      componentName,
      _,
      beforeAttr,
      objectContent,
      afterAttr,
      objectContentNoComponent,
      singleVariable,
    ) => {
      const processContent = (content) => {
        const parts = content.split(",").map((part) => part.trim());
        const eventHandlersPart = parts.find((part) =>
          part.startsWith("...eventHandlers"),
        );
        const spreadAttributesPart = parts.find((part) =>
          part.startsWith("...spreadAttributes"),
        );

        let otherParts = parts.filter(
          (part) =>
            !part.startsWith("...eventHandlers") &&
            !part.startsWith("...spreadAttributes"),
        );

        let result = "";
        if (spreadAttributesPart) {
          result += `v-bind="${spreadAttributesPart.replace(/^\.\.\./, "")}"`;
        }
        if (otherParts.length > 0) {
          if (result) result += " ";
          result += `v-bind="${otherParts.join(", ")}"`;
        }
        if (eventHandlersPart) {
          if (result) result += " ";
          result += `v-on="eventHandlers"`;
        }
        return result;
      };

      if (componentName) {
        // Custom component case
        const processedContent = processContent(objectContent);
        return `<${componentName}${beforeAttr}${processedContent}${afterAttr}>`;
      } else if (objectContent || objectContentNoComponent) {
        return processContent(objectContent || objectContentNoComponent);
      } else if (singleVariable) {
        if (singleVariable === "...eventHandlers") {
          return `v-on="eventHandlers"`;
        } else if (singleVariable === "...spreadAttributes") {
          return `v-bind="spreadAttributes"`;
        } else {
          return `v-bind="${singleVariable}"`;
        }
      }
      return match;
    },
  );

  // Remove extra curly braces and fix quotes
  updatedTemplateContent = updatedTemplateContent.replace(
    /v-bind=["']\{\{(.+?)\}\}["']/g,
    (match, content) =>
      `v-bind="${content.replace(/"/g, "'").replace(/^\s*\.\.\./g, "")}"`,
  );

  updatedTemplateContent = updatedTemplateContent.replace(
    /v-on=["']\{\{(.+?)\}\}["']/g,
    'v-on="$1"',
  );

  // Fix any remaining issues with quotes and remove extra spread operators
  updatedTemplateContent = updatedTemplateContent.replace(
    /v-bind=["'](.+?)["']/g,
    (match, content) =>
      `v-bind="${content.replace(/"/g, "'").replace(/^\s*\.\.\./g, "")}"`,
  );

  // Add eventMappings object to emit manually all events
  const eventMappingsObject = `
    const eventMappings = ${JSON.stringify(eventMappings, null, 2)};
  `;

  const hasEventHandlers = updatedScriptContent.includes("eventHandlers");

  // Reassemble the Vue file, keeping template and script separate
  const updatedCode = `${beforeTemplate}${updatedTemplateContent}${afterTemplate.replace(
    /<script[^>]*>[\s\S]*?<\/script>/,
    `<script setup lang="ts">
    ${hasEventHandlers ? eventMappingsObject : ""}
    ${updatedScriptContent.trim()}
    </script>`,
  )}`;

  return updatedCode;
}

function fixVueClassName(codeStr) {
  return codeStr.replace(/\bprops\.className\b/g, "props.class");
}
