import prettier from "prettier";

export async function formatCode(codeString: string) {
  try {
    return prettier.format(codeString, {
      parser: "typescript",
      semi: true,
      singleQuote: false,
      trailingComma: "es5",
      printWidth: 80,
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Error formatting code", error);
    return codeString;
  }
}
