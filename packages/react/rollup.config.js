const baseDevConfig = require("../../rollup.config.dev");
const baseProdConfig = require("../../rollup.config");

const config =
  process.env.NODE_ENV === "production" ? baseProdConfig : baseDevConfig;

module.exports = config({
  dir: __dirname,
  packageJson: require("./package.json"),
  babelPresets: ["@babel/preset-react"],
  compilerOptions: {
    jsx: "react",
    jsxImportSource: null,
  },
});
