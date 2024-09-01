// @ts-check

/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
module.exports = function vueCompilerPlugin() {
  return {
    code: {
      // Happens before formatting
      pre: (codeStr) => {
        return [fixCleanupRefIssues].reduce((acc, transform) => {
          acc = transform(codeStr);
          return acc;
        }, codeStr);
      },
    },
  };
};

function fixCleanupRefIssues(codeStr) {
  return codeStr.replace(
    /if \(typeof cleanupRef\.value === "function"\) \{\s*cleanupRef\(\);\s*\}/g,
    'if (typeof cleanupRef.value === "function") {\n    cleanupRef.value();\n  }',
  );
}
