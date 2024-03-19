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

  return [
    /require\(".\/interchain-ui-kit-(.*).cjs.css"\);/g,
    /import(\s*)".\/interchain-ui-kit-(.*).esm.css";/g,
  ];
}
