// @ts-check
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const { vueCodemod } = require("../../packages/vue-codemod");

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
        return [fixVueClassName, vueCodemod].reduce((acc, transform) => {
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

function fixVueClassName(codeStr) {
  return codeStr.replace(/\bprops\.className\b/g, "props.class");
}
