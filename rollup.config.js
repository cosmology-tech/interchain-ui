const path = require("path");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const dtsPlugin = require("rollup-plugin-dts").default;
const typescript = require("rollup-plugin-ts");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const depsExternal = require("rollup-plugin-node-externals");
const { vanillaExtractPlugin } = require("@vanilla-extract/rollup-plugin");
const json = require("@rollup/plugin-json");
const analyze = require("rollup-plugin-analyzer");

const BUNDLE_LIMIT_BYTES = 1.5e5; // 150KB

const checkBundleSizeLimit = ({ bundleSize }) => {
  if (bundleSize < BUNDLE_LIMIT_BYTES) return;

  console.log(
    "\x1b[31m",
    `Bundle size exceeds LIMIT of ${BUNDLE_LIMIT_BYTES} bytes: ${bundleSize} bytes`
  );

  return process.exit(1);
};

module.exports = (options) => {
  const {
    dir,
    tsConfigDir,
    packageJson,
    plugins = [],
    external = [],
    dts = true,
    compilerOptions = {},
    babelPresets = [],
    babelPlugins = [],
    disableCoreCompilation = false,
  } = options;

  const tsconfig =
    typeof tsConfigDir === "string"
      ? require(tsConfigDir)
      : require(path.resolve(__dirname, "./tsconfig.json"));

  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    ...compilerOptions,
  };

  const defaultPresets = [
    "@babel/preset-env",
    ["@babel/preset-typescript", tsconfig.compilerOptions],
  ];

  const inputs = [
    disableCoreCompilation
      ? null
      : {
          input: options.input || path.resolve(dir, "src/index.ts"),
          output: [
            {
              file: packageJson.main,
              format: "cjs",
              sourcemap: true,
              // Change .css.js files to something else so that they don't get re-processed by consumer's setup
              entryFileNames({ name }) {
                return `${name.replace(/\.css$/, ".css.vanilla")}.js`;
              },
              // Apply preserveModulesRoot to asset names
              assetFileNames({ name }) {
                return name.replace(/^src\//, "");
              },
            },
            {
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
          ],
          treeshake: true,
          external,
          plugins: [
            ...plugins,
            resolve.nodeResolve({ extensions: [".js", ".ts", ".tsx"] }),
            json(),
            typescript({
              tsconfig: {
                ...tsconfig.compilerOptions,
                emitDeclarationOnly: true,
              },
            }),
            // Convert styled sheets to separate CSS files
            vanillaExtractPlugin({
              identifiers: "debug", // Can be 'short' hash
            }),
            depsExternal(),
            babel({
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  { legacy: true },
                  ...babelPlugins,
                ],
              ],
              extensions: [".js", ".ts", ".tsx"],
              presets:
                babelPresets.length > 0
                  ? [...babelPresets, ...defaultPresets]
                  : defaultPresets,
              babelHelpers: "bundled",
              ignore: [/node_modules/],
            }),
            peerDepsExternal(),
            commonjs(),
            analyze({
              onAnalysis: checkBundleSizeLimit,
            }),
          ],
        },
    dts && !disableCoreCompilation
      ? {
          input: path.resolve(dir, packageJson.module.replace(".js", ".d.ts")),
          output: [
            { file: path.resolve(dir, "dist/index.d.ts"), format: "esm" },
          ],
          plugins: [dtsPlugin()],
        }
      : null,
  ];

  return inputs.filter((x) => x);
};
