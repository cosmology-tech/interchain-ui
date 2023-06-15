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
  const cssImport = getCssImport();
  return code.replace(cssImport, "").trim();
}

function getCssImport() {
  const path = process.cwd();
  const re = /packages\/(.*)/gi;
  const matches = path.match(re);
  if (!matches) return "";

  const platform = matches[0].replace("packages/", "");
  return `import "./cosmology-ui-kit-${platform}.cjs.css";`;
}
