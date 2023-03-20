const vue = require("rollup-plugin-vue");
const config = require("../../rollup.config");

module.exports = config({
  dir: __dirname,
  packageJson: require("./package.json"),
  plugins: [vue()],
  external: ["vue"],
  dts: false,
});
