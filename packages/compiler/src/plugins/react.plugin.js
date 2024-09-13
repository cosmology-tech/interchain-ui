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
        return [fixReactTypeIssuesPlugin, fixIncorrectRefNamePlugin].reduce(
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

function fixReactTypeIssuesPlugin(codeStr) {
  const s1 = transformForwardRef(codeStr);

  return (
    s1
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

function transformForwardRef(codeStr) {
  // First part: Transform the forwardRef part
  const transformedForwardRef = codeStr.replace(
    /forwardRef<\s*([A-Za-z]+)Props\s*\[\s*"(\w+)Ref"\s*\]\s*>/g,
    (_match, componentName, _ref) => {
      return `forwardRef<any, ${componentName}Props>`;
    },
  );

  // Second part: Transform the function signature to use the correct ref case
  const transformedFunctionSignature = transformedForwardRef.replace(
    /function\s+([A-Za-z]+)\s*\(\s*props\s*:\s*\1Props\s*,\s*(\w+)\s*\)/g,
    (_match, componentName, refParam) => {
      // Ensure the parameter ends with 'Ref' and construct the type key
      const refParamWithRef = refParam.endsWith("Ref")
        ? refParam
        : `${refParam}Ref`;
      const propKey =
        refParamWithRef.charAt(0).toLowerCase() + refParamWithRef.slice(1);
      return `function ${componentName}(props: ${componentName}Props, ${refParamWithRef}: ${componentName}Props["${propKey}"])`;
    },
  );

  return transformedFunctionSignature;
}

export function fixBoxForwardRef(codeStr) {
  const isBoxComponent = codeStr.match(/const\s+Box\s*=\s*forwardRef/);

  if (isBoxComponent) {
    // Add import for BoxProps
    codeStr = codeStr.replace(
      /import { DEFAULT_VALUES } from "\.\/box\.types";/,
      `import { DEFAULT_VALUES, BoxProps } from "./box.types";`,
    );

    // Modify forwardRef call to include BoxProps
    codeStr = codeStr.replace(
      /const Box = forwardRef\(function Box\(props, boxRef\)/,
      `const Box = forwardRef(function Box(props: BoxProps, boxRef)`,
    );
  }

  return codeStr;
}

function fixIncorrectRefNamePlugin(codeStr) {
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
