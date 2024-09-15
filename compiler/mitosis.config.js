const reactPlugin = require("./plugins/react.plugin");
const vuePlugin = require("./plugins/vue.plugin");

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
      typescript: true,
      defineComponent: true,
      namePrefix: "interchain",
      api: "composition",
      plugins: [vuePlugin],
    },
  },
};
