const reactPlugin = require("./plugins/react.plugin");

/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  targets: ["vue", "react"],
  options: {
    react: {
      typescript: true,
      // TODO: turn this on when we distribute components as preserved modules
      addUseClientDirectiveIfNeeded: false,
      plugins: [reactPlugin],
    },
    vue: {
      typescript: false,
      api: "composition",
    },
  },
};
