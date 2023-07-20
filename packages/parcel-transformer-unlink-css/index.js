const { Optimizer } = require("@parcel/plugin");
const { blobToString } = require("@parcel/utils");

module.exports = new Optimizer({
  async optimize({ contents, map }) {
    const codeStr = await blobToString(contents);
    return {
      contents: unlinkStylesheets(codeStr),
      map,
    };
  },
});

function unlinkStylesheets(code) {
  const cssImports = getCssImports();
  let finalCode = code;

  cssImports.forEach((importStatementRegex) => {
    finalCode = finalCode.replace(importStatementRegex, "");
  });
  return finalCode.trim();
}

function getCssImports() {
  const path = process.cwd();
  const re = /packages\/(.*)/gi;
  const matches = path.match(re);
  if (!matches) return "";

  const platform = matches[0].replace("packages/", "");

  return [
    new RegExp(`require("./interchain-ui-kit-${platform}.cjs.css");`, "g"),
    new RegExp(`import(\s*)".\/interchain-ui-kit-${platform}.cjs.css";`, "g"),
  ];
}
