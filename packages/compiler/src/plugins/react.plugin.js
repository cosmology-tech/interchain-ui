// @ts-check
const scaffolds = require("../scaffold.config.js");
const scaffoldConfig = scaffolds.scaffoldConfig;

/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
module.exports = function reactCompilerPlugin() {
  return {
    json: {
      pre: (json) => {
        const comp = {
          ...json,
        };

        const scaffolds = comp.meta.useMetadata?.scaffolds ?? [];

        if (scaffolds.length > 0) {
          // An import will have this shape
          // {
          //   imports: { WalletConnectModalProps: 'WalletConnectModalProps' },
          //   path: './wallet-connect-modal.types'
          // }
          scaffolds.forEach((scaffold) => {
            const scaffoldMeta = scaffoldConfig[scaffold];

            if (scaffoldMeta) {
              comp.imports.push(scaffoldMeta.import);
            }

            changeJsxTag(comp, scaffold);
          });
        }

        return comp;
      },
    },
    code: {
      // Happens before formatting
      pre: (codeStr) => {
        return [fixReactTypeIssues, fixIncorrectRefName].reduce(
          (acc, transform) => {
            acc = transform(codeStr);
            return acc;
          },
          codeStr,
        );
      },
    },
  };
};

// @ts-expect-error
module.exports.fixReactTypeIssues = fixReactTypeIssues;

function changeJsxTag(component, scaffoldName) {
  const scaffoldMeta = scaffoldConfig[scaffoldName];

  // Check if the node has a name property that contains "Scaffold"
  if (component.name && isScaffoldJSXTag(component.name)) {
    // Replace scaffold jsx tag in the name property
    component.name = scaffoldMeta.jsxMap[component.name];
  }

  // Check if the node has a children property
  if (componentHasChildren(component)) {
    // Recursively check each child node
    component.children = component.children.map((child) => {
      const isDirectNodeScaffold = isScaffoldJSXTag(child.name);

      if (isDirectNodeScaffold) {
        return {
          ...child,
          name: scaffoldMeta.jsxMap[child.name],
        };
      } else if (componentHasChildren(child)) {
        return changeJsxTag(child, scaffoldName);
      }

      return child;
    });
  }

  return component;
}

function isScaffoldJSXTag(componentName) {
  return componentName.includes("Scaffold");
}

function componentHasChildren(component) {
  return component.children && Array.isArray(component.children);
}

function fixIncorrectRefName(codeStr) {
  const re = /boxRef=\{([^{}]+)\.current\}/g;
  const isBoxComponent = codeStr.includes(
    `const Box = forwardRef<BoxProps["boxRef"]>`,
  );

  // If the component is a Box component, we need to change the actual ref passed with props.boxRef or boxRef (forwardedRef)
  if (isBoxComponent) {
    return codeStr.replace(`ref={boxRef}`, `ref={props.boxRef ?? boxRef}`);
  }

  return codeStr.replace(re, "boxRef={$1}");
}
