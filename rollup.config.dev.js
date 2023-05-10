const path = require("path");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const image = require("@rollup/plugin-image");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const depsExternal = require("rollup-plugin-node-externals");
const { vanillaExtractPlugin } = require("@vanilla-extract/rollup-plugin");
const json = require("@rollup/plugin-json");
const { swc, defineRollupSwcOption } = require("rollup-plugin-swc3");

module.exports = (options) => {
  const {
    dir,
    tsConfigDir,
    packageJson,
    plugins = [],
    external = [],
    compilerOptions = {},
  } = options;

  const tsconfig =
    typeof tsConfigDir === "string"
      ? require(tsConfigDir)
      : require(path.resolve(__dirname, "./tsconfig.json"));

  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    ...compilerOptions,
  };

  return [
    {
      input: options.input || path.resolve(dir, "src/index.ts"),
      output: {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        // Change .css.js files to something else so that they don't get re-processed by consumer's setup
        entryFileNames({ name }) {
          return `${name.replace(/\.css.ts$/, ".css.vanilla")}.js`;
        },
        // Apply preserveModulesRoot to asset names
        assetFileNames({ name }) {
          return name.replace(/^src\//, "");
        },
      },
      treeshake: true,
      external,
      plugins: [
        ...plugins,
        resolve.nodeResolve({ extensions: [".js", ".ts", ".tsx"] }),
        json(),
        swc(
          defineRollupSwcOption({
            // All options are optional
            include: /\.[mc]?[jt]sx?$/, // default
            exclude: /node_modules/, // default
            tsconfig: false,
            // tsconfig: false, // You can also prevent `rollup-plugin-swc` from reading tsconfig.json, see below
            // And add your swc configuration here!
            // "filename" will be ignored since it is handled by rollup
            jsc: {
              target: "esnext",
              parser: {
                syntax: "typescript",
              },
            },
          })
        ),
        // Convert styled sheets to separate CSS files
        vanillaExtractPlugin({
          identifiers: "short",
          // identifiers: shouldMinify ? "short" : "debug", // Can be 'short' hash
        }),
        depsExternal(),
        peerDepsExternal(),
        commonjs(),
        image(),
      ],
    },
  ];
};
