// @ts-check
const { Listr } = require("listr2");
const commandLineArgs = require("command-line-args");

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
              task: () =>
                execa("yarn clean").catch(() => {
                  throw new Error("Cannot remove output directory");
                }),
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
      task: () =>
        execa(
          `yarn lerna --verbose --scope=@cosmology-mitosis/${
            cliConfig.platforms.length > 1
              ? `{${cliConfig.platforms?.join(",")}}`
              : cliConfig.platforms
          } build`
        ).catch((error) => {
          throw new Error("Error bundling Packages " + error);
        }),
    },
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
