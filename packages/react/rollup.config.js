// const path = require("path");
const baseConfig = require("../../rollup.config");

module.exports = baseConfig({
  dir: __dirname,
  // tsConfigDir: path.resolve("./tsconfig.json"),
  packageJson: require("./package.json"),
  babelPresets: ["@babel/preset-react"],
  compilerOptions: {
    jsx: "react",
    jsxImportSource: null,
  },
});
