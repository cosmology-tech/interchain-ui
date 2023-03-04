const baseConfig = require("../../rollup.config");

module.exports = baseConfig({
  dir: __dirname,
  packageJson: require("./package.json"),
  babelPresets: ["@babel/preset-react"],
  compilerOptions: {
    jsx: "react",
    jsxImportSource: null,
  },
});
