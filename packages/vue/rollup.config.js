const config = require("../../rollup.config");
const vue = require("rollup-plugin-vue");
const ts = require("rollup-plugin-typescript");

module.exports = config({
  dir: __dirname,
  packageJson: require("./package.json"),
  plugins: [
    ts({
      tsconfig: false,
      experimentalDecorators: true,
      module: "es2015",
    }),
    vue(),
  ],
  external: ["vue"],
  dts: false,
});
