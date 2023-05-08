// @ts-check
const { Listr } = require("listr2");
const commandLineArgs = require("command-line-args");
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

const shouldMinify = process.env.MINIFY === "on";

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
              task: (_, task) => {
                const platforms = Array.isArray(cliConfig.platforms)
                  ? cliConfig.platforms
                  : [cliConfig.platforms];

                const platformPkgRoot =
                  platforms.length === 1
                    ? `${platforms}`
                    : `{${platforms.join(",")}}`;

                const cleanCmd = `rimraf packages/${platformPkgRoot}/{src,dist,lib,types,node_modules,stats.html}`;
                task.output = `Cleaning dir: ${cleanCmd}`;
                return exec(cleanCmd);
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
        const platforms = Array.isArray(cliConfig.platforms)
          ? cliConfig.platforms
          : [cliConfig.platforms];

        const platformGlob =
          platforms.length === 1
            ? platforms
            : `{${cliConfig.platforms.join(",")}}`;

        const filters = `--scope=@cosmology-mitosis/${platformGlob}`;

        const buildCmd = `lerna run --stream ${filters} build`;

        try {
          await exec(buildCmd);

          if (shouldMinify) {
            const minifyCssCmd = `lerna run --stream ${filters} minifyCss`;
            await exec(minifyCssCmd);
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
