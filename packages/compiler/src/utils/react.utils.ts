export function fixReactTypeIssues(codeStr: string): string {
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

function transformForwardRef(codeStr: string): string {
  // First part: Transform the forwardRef part
  const transformedForwardRef = codeStr.replace(
    /forwardRef<\s*([A-Za-z]+)Props\s*\[\s*"(\w+)Ref"\s*\]\s*>/g,
    (_match: string, componentName: string, _ref: string) => {
      return `forwardRef<any, ${componentName}Props>`;
    },
  );

  // Second part: Transform the function signature to use the correct ref case
  const transformedFunctionSignature = transformedForwardRef.replace(
    /function\s+([A-Za-z]+)\s*\(\s*props\s*:\s*\1Props\s*,\s*(\w+)\s*\)/g,
    (_match: string, componentName: string, refParam: string) => {
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

export function fixBoxForwardRef(codeStr: string): string {
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

function fixIncorrectRefName(codeStr: string): string {
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
