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

  cssImports.forEach((importStatement) => {
    finalCode = finalCode.replace(importStatement, "");
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
    `require("./interchain-ui-kit-${platform}.cjs.css");`,
    `import "./interchain-ui-kit-${platform}.cjs.css";`,
  ];
}
