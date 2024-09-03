// @ts-check

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
      const { parse } = require("@babel/parser");
      const traverse = require("@babel/traverse").default;
      const generate = require("@babel/generator").default;
      const t = require("@babel/types");

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
    // Add more event mappings as needed
  };

  let updatedCode = codeStr;
  const detectedEvents = new Set();

  // Convert event syntax and detect custom events
  Object.entries(eventMappings).forEach(([mitosisEvent, vueEvent]) => {
    const regex = new RegExp(`:(${mitosisEvent})\\s*=\\s*"([^"]*)"`, "g");
    updatedCode = updatedCode.replace(regex, (match, event, handler) => {
      detectedEvents.add(vueEvent);
      return `@${vueEvent}="${handler}"`;
    });

    // Detect props events
    const propsRegex = new RegExp(`props\\.${mitosisEvent}`, "g");
    if (propsRegex.test(updatedCode)) {
      detectedEvents.add(vueEvent);
    }
  });

  // Add defineEmits
  if (detectedEvents.size > 0) {
    const emitsArray = Array.from(detectedEvents)
      .map((event) => `'${event}'`)
      .join(", ");
    const defineEmitsStatement = `const emit = defineEmits([${emitsArray}]);\n`;

    // Insert defineEmits after the last import statement or at the beginning of the <script> block
    const importRegex = /^import .+$/gm;
    const lastImportMatch = [...updatedCode.matchAll(importRegex)].pop();

    if (lastImportMatch) {
      const insertIndex = lastImportMatch.index + lastImportMatch[0].length;
      updatedCode =
        updatedCode.slice(0, insertIndex) +
        "\n" +
        defineEmitsStatement +
        updatedCode.slice(insertIndex);
    } else {
      const scriptSetupIndex = updatedCode.indexOf("<script setup");
      if (scriptSetupIndex !== -1) {
        const insertIndex = updatedCode.indexOf(">", scriptSetupIndex) + 1;
        updatedCode =
          updatedCode.slice(0, insertIndex) +
          "\n" +
          defineEmitsStatement +
          updatedCode.slice(insertIndex);
      }
    }
  }

  // Replace props event handlers with emit calls
  Object.entries(eventMappings).forEach(([mitosisEvent, vueEvent]) => {
    const regex = new RegExp(
      `(props\\.${mitosisEvent})\\s*\\?\\.(\\w+)\\((.*?)\\)`,
      "g",
    );
    updatedCode = updatedCode.replace(regex, `emit('${vueEvent}', $3)`);
  });

  return updatedCode;
}

function fixVueClassName(codeStr) {
  return codeStr.replace(/\bprops\.className\b/g, "props.class");
}
