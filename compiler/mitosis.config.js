const reactPlugin = require("./plugins/react.plugin");

/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  options: {
    react: {
      typescript: true,
      plugins: [reactPlugin],
    },
    vue: {
      typescript: true,
    },
  },
};
