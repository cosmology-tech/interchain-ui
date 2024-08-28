// @ts-check
import vue from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/interchain-ui-vue.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/interchain-ui-vue.esm.js",
      format: "es",
    },
  ],
  external: ["vue"],
  plugins: [
    alias({
      entries: [{ find: "@", replacement: "./src" }],
    }),
    vue(),
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    vanillaExtractPlugin(),
    terser(),
  ],
};
