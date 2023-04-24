// @ts-check
const { Listr } = require("listr2");
const commandLineArgs = require("command-line-args");
const { rimraf } = require("rimraf");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const optionDefinitions = [
  { name: "elements", alias: "e", type: String, multiple: true },
  {
    name: "platforms",
    alias: "p",
    type: String,
    multiple: true,
    defaultValue: ["react", "vue"], // TODO: add more targets below
    // defaultValue: ["angular", "react", "solid", "svelte", "vue"],
  },
  { name: "lint", type: Boolean, defaultValue: true },
  { name: "no-lint", type: Boolean },
];

(async () => {
  const cliConfig = commandLineArgs(optionDefinitions);
  const execa = (await import("execa")).command;
  cliConfig.lint = cliConfig.lint && !cliConfig["no-lint"]; // TODO: add linting

  const tasks = new Listr([
    {
      title: "Pretasks",
      task: () => {
        return new Listr(
          [
            {
              title: "Clean output",
              task: () => {
                const platforms = Array.isArray(cliConfig.platforms)
                  ? cliConfig.platforms
                  : [cliConfig.platforms];

                return rimraf(
                  `packages/{${platforms.join(
                    ","
                  )}}/{src,dist,lib,types,node_modules,stats.html}`
                );
              },
            },
          ],
          { concurrent: true }
        );
      },
    },
    {
      title: `Compile Mitosis Elements: ${
        cliConfig.elements?.join(", ") || "all"
      }`,
      task: () => {
        return new Listr(
          cliConfig.platforms.map((platform) => ({
            title: `Compile ${platform}`,
            task: () =>
              execa(
                `node ./compiler/frameworks/${platform}.compile.js ${
                  cliConfig.elements
                    ? `--elements ${cliConfig.elements.join(" ")}`
                    : ""
                }`
              ).catch((error) => {
                throw new Error(`Error compiling ${platform} ${error.message}`);
              }),
          })),
          { concurrent: true }
        );
      },
    },
    {
      title: `Bundle Packages: ${cliConfig.platforms?.join(", ") || ""}`,
      task: async () => {
        const filters = cliConfig.platforms
          .map((platform) => `--filter "@cosmology-mitosis/${platform}"`)
          .join(" ");

        const command = `pnpm --stream ${filters} run build`;

        try {
          const { stderr } = await exec(command);
          if (stderr) {
            throw new Error("Error bundling packages " + stderr);
          }
        } catch (error) {
          throw new Error("Error bundling packages " + error);
        }
      },
    },
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
