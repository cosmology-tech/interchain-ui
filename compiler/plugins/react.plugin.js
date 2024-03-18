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

function fixReactTypeIssues(codeStr) {
  return (
    codeStr
      // Fix forwardRef<TRef, TProps> not putting the second generic parameter TProps in output code
      .replace(/forwardRef<(.*)\["(.*)"\]>\(/g, `forwardRef<$1["$2"], $1>(`)
      // Fix typescript types for children prop
      .replace(/children\?:\sany/g, "children?: React.ReactNode")
      .replace(/Children\s=\sany/g, "Children = React.ReactNode")
      // Fix content editable
      .replace(
        /contentEditable\=(.*)/g,
        "contentEditable=$1\nsuppressContentEditableWarning={true}",
      )
      // Fix some svg attributes not correctly compiled
      .replace(/(shape-rendering)="(.*)"/g, `shapeRendering="$2"`)
      .replace(/(clip-path)="(.*)"/g, `clipPath="$2"`)
      .replace(/(clip-rule)="(.*)"/g, `clipRule="$2"`)
      .replace(/(stroke-linejoin)="(.*)"/g, `strokeLinejoin="$2"`)
      .replace(/(stroke-linecap)="(.*)"/g, `strokeLinecap="$2"`)
      .replace(/(stroke-width)="(.*)"/g, `strokeWidth="$2"`)
      .replace(/(fill-rule)="(.*)"/g, `fillRule="$2"`)
      .replace(/(srcset)={(.*)}/g, `srcSet={$2}`)
  );
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
