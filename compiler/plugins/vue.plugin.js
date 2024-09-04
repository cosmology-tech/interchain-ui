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
        return [fixVueClassName, fixVueEventHandlers].reduce(
          (acc, transform) => {
            acc = transform(acc);
            return acc;
          },
          codeStr,
        );
      },
    },
  };
};

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

  // Match all template sections, including named slots
  const templateMatches =
    codeStr.match(/<template[^>]*>[\s\S]*?<\/template>/g) || [];
  const scriptMatch = codeStr.match(/<script[^>]*>([\s\S]*?)<\/script>/);

  if (!scriptMatch) {
    return codeStr; // If there's no script section, return the original code
  }

  const scriptContent = scriptMatch[1];

  const ast = parse(scriptContent, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const detectedEvents = new Set();

  traverse(ast, {
    // Detect events in JSX attributes
    JSXAttribute(path) {
      const name = path.node.name;
      if (t.isJSXIdentifier(name) && name.name in eventMappings) {
        const vueEvent = eventMappings[name.name];
        detectedEvents.add(vueEvent);
        name.name = `@${vueEvent}`;
      }
    },
    // Detect events in object properties or variable declarations
    Property(path) {
      if (
        t.isIdentifier(path.node.key) &&
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
    // Convert props event handlers to emit calls
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.object, { name: "props" }) &&
        t.isIdentifier(path.node.callee.property) &&
        path.node.callee.property.name in eventMappings
      ) {
        const vueEvent = eventMappings[path.node.callee.property.name];
        path.replaceWith(
          t.callExpression(t.identifier("emit"), [
            t.stringLiteral(vueEvent),
            ...path.node.arguments,
          ]),
        );
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

  // Update template event bindings for all template sections
  const updatedTemplates = templateMatches.map((template) => {
    let updatedTemplate = template;
    Object.entries(eventMappings).forEach(([mitosisEvent, vueEvent]) => {
      const regex = new RegExp(`:(${mitosisEvent})\\s*=\\s*"([^"]*)"`, "g");
      updatedTemplate = updatedTemplate.replace(regex, `@${vueEvent}="$2"`);
    });
    return updatedTemplate;
  });

  // Reassemble the Vue file
  const updatedCode = `
    ${updatedTemplates.join("\n")}

    <script setup lang="ts">
    ${updatedScriptContent.trim()}
    </script>
`;

  return updatedCode;
}

function fixVueClassName(codeStr) {
  return codeStr.replace(/\bprops\.className\b/g, "props.class");
}
