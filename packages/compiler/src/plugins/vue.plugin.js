// @ts-check
const vueCodemod = require("@interchain-ui/vue-codemod").default;

/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
module.exports = function vueCompilerPlugin() {
  return {
    json: {
      post: (json) => {
        // console.log("Processing JSON for component:", json.name);
        return fixRefUsages(json);
      },
    },
    code: {
      // Happens before formatting
      pre: (codeStr) => {
        return [
          fixVueClassName,
          vueCodemod,
          fixRefUsages,
          addMissingImports,
        ].reduce((acc, transform) => transform(acc), codeStr);
      },
    },
  };
};

function fixRefUsages(ast) {
  // Find all ref bindings
  const refBindings = new Set();
  if (ast.children) {
    ast.children.forEach((child) => {
      if (child.bindings && child.bindings.ref) {
        refBindings.add(child.bindings.ref.code);
      }
    });
  }

  // Add refs defined in the component's refs object
  if (ast.refs) {
    Object.keys(ast.refs).forEach((refName) => {
      refBindings.add(refName);
    });
  }

  // Helper function to replace ref usages in code
  function replaceRefUsages(code) {
    let updatedCode = code;
    refBindings.forEach((refName) => {
      const refRegex = new RegExp(`\\b${refName}\\b(?!\\.value)`, "g");
      updatedCode = updatedCode.replace(refRegex, `${refName}.value`);
    });

    // Handle useSlots and similar composition API functions
    const compositionApiFunctions = ["useSlots", "useAttrs", "useContext"];
    compositionApiFunctions.forEach((funcName) => {
      const funcRegex = new RegExp(`\\b${funcName}\\(\\)\\.`, "g");
      updatedCode = updatedCode.replace(funcRegex, `${funcName}().`);
    });

    // Special handling for useSlots in watch dependencies
    updatedCode = updatedCode.replace(
      /(watch\s*\(\s*\(\s*\)\s*=>)\s*\[(.*?)\]/,
      (match, watchStart, dependencies) => {
        const updatedDeps = dependencies
          .split(",")
          .map((dep) => {
            if (dep.trim() === "useSlots().default") {
              return "slots.default?.()";
            }
            return dep.trim();
          })
          .join(", ");
        return `const slots = useSlots();\n${watchStart} [${updatedDeps}]`;
      },
    );

    return updatedCode;
  }

  // Fix ref usages in all hooks
  if (ast.hooks) {
    Object.keys(ast.hooks).forEach((hookType) => {
      const hook = ast.hooks[hookType];
      if (Array.isArray(hook)) {
        hook.forEach((item) => {
          if (item.code) {
            item.code = replaceRefUsages(item.code);
          }
        });
      } else if (typeof hook === "object" && hook !== null) {
        if (hook.code) {
          hook.code = replaceRefUsages(hook.code);
        }
      }
    });

    // Special handling for onUnMount hook
    if (ast.hooks.onUnMount && typeof ast.hooks.onUnMount === "object") {
      if (ast.hooks.onUnMount.code) {
        ast.hooks.onUnMount.code = ast.hooks.onUnMount.code.replace(
          /(\w+)\(\)/g,
          (match, funcName) => {
            if (refBindings.has(funcName)) {
              return `${funcName}.value()`;
            }
            return match;
          },
        );
      }
    }
  }

  // Fix ref usages in state
  if (ast.state) {
    Object.keys(ast.state).forEach((key) => {
      if (typeof ast.state[key] === "string") {
        ast.state[key] = replaceRefUsages(ast.state[key]);
      }
    });
  }

  return ast;
}

function addMissingImports(codeStr) {
  const scriptSetupMatch = codeStr.match(
    /<script setup.*?>([\s\S]*?)<\/script>/,
  );

  if (!scriptSetupMatch) return codeStr;

  let scriptContent = scriptSetupMatch[1];
  const usedImports = new Set();
  const existingImports = new Set();

  // Extract existing Vue imports
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]vue['"];?/g;
  let match;
  while ((match = importRegex.exec(scriptContent)) !== null) {
    const imports = match[1].split(",").map((imp) => imp.trim());
    imports.forEach((imp) => existingImports.add(imp));
  }

  // Define commonly used Vue 3 constructs
  const constructs = [
    { name: "ref", regex: /\bref\s*\(|\bref</ },
    { name: "reactive", regex: /\breactive\s*\(/ },
    { name: "computed", regex: /\bcomputed\s*\(/ },
    { name: "watch", regex: /\bwatch\s*\(/ },
    { name: "watchEffect", regex: /\bwatchEffect\s*\(/ },
    { name: "onMounted", regex: /\bonMounted\s*\(/ },
    { name: "onUnmounted", regex: /\bonUnmounted\s*\(/ },
    { name: "onUpdated", regex: /\bonUpdated\s*\(/ },
    { name: "nextTick", regex: /\bnextTick\s*\(/ },
    { name: "provide", regex: /\bprovide\s*\(/ },
    { name: "inject", regex: /\binject\s*\(/ },
    { name: "toRef", regex: /\btoRef\s*\(/ },
    { name: "toRefs", regex: /\btoRefs\s*\(/ },
    { name: "isRef", regex: /\bisRef\s*\(/ },
    { name: "unref", regex: /\bunref\s*\(/ },
    { name: "useSlots", regex: /\buseSlots\s*\(|\bconst\s+slots\s*=/ },
    { name: "useAttrs", regex: /\buseAttrs\s*\(/ },
    { name: "h", regex: /\bh\s*\(/ },
    { name: "defineEmits", regex: /\bdefineEmits\s*[<(]/ },
    { name: "defineExpose", regex: /\bdefineExpose\s*\(/ },
    { name: "useSlots", regex: /\buseSlots\s*\(/ },
  ];

  // Detect used constructs
  constructs.forEach(({ name, regex }) => {
    if (regex.test(scriptContent)) {
      usedImports.add(name);
    }
  });

  // Determine missing imports
  const missingImports = [...usedImports].filter(
    (imp) => !existingImports.has(imp),
  );

  if (missingImports.length > 0) {
    const importStatement = `import { ${missingImports.sort().join(", ")} } from 'vue';\n`;

    // Merge with existing imports or add new import statement
    if (existingImports.size > 0) {
      codeStr = codeStr.replace(
        /(import\s*{[^}]+}\s*from\s*['"]vue['"];?)/,
        (match) => {
          const existingImports = match
            .match(/{([^}]+)}/)[1]
            .split(",")
            .map((imp) => imp.trim());
          const allImports = [
            ...new Set([...existingImports, ...missingImports]),
          ]
            .sort()
            .join(", ");
          return `import { ${allImports} } from 'vue';`;
        },
      );
    } else {
      codeStr = codeStr.replace(/<script setup.*?>/, `$&\n${importStatement}`);
    }
  }

  // Handle useSlots in watch dependencies
  codeStr = codeStr.replace(
    /(watch\s*\(\s*\(\s*\)\s*=>)\s*\[(.*?useSlots\(\)\.default.*?)\]/,
    (match, watchStart, dependencies) => {
      const slotsDeclaration = "const slots = useSlots();\n";
      const updatedDeps = dependencies.replace(
        "useSlots().default",
        "slots.default",
      );
      return `${slotsDeclaration}${watchStart} [${updatedDeps}]`;
    },
  );

  return codeStr;
}

function fixVueClassName(codeStr) {
  return codeStr.replace(/\bprops\.className\b/g, "props.class");
}
