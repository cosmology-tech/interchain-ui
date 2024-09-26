import { Listr } from "listr2";
import commandLineArgs from "command-line-args";
import util from "util";
import { exec as execCallback } from "child_process";
import { command as execa } from "execa";

const exec = util.promisify(execCallback);

interface CliConfig {
  elements?: string[];
  platforms: string[];
  lint: boolean;
  "no-lint"?: boolean;
}

const optionDefinitions: commandLineArgs.OptionDefinition[] = [
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

const shouldMinify = process.env.MINIFY === "true";
const shouldSkipBundling = process.env.NO_BUILD === "true";

(async () => {
  const cliConfig = commandLineArgs(optionDefinitions) as CliConfig;
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

                const cleanCmd = `rimraf packages/${platformPkgRoot}/{src,dist,lib,types,stats.html}`;
                task.output = `Cleaning dir: ${cleanCmd}`;
                return exec(cleanCmd);
              },
            },
          ],
          { concurrent: true },
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
                `tsx packages/compiler/src/frameworks/${platform}.compile.ts ${
                  cliConfig.elements
                    ? `--elements ${cliConfig.elements.join(" ")}`
                    : ""
                }`,
              ).catch((error: Error) => {
                throw new Error(`Error compiling ${platform} ${error.message}`);
              }),
          })),
          { concurrent: true },
        );
      },
    },
    {
      title: `Bundle Packages: ${cliConfig.platforms?.join(", ") || ""}`,
      task: async () => {
        if (shouldSkipBundling) return true;

        const platforms = Array.isArray(cliConfig.platforms)
          ? cliConfig.platforms
          : [cliConfig.platforms];

        const platformGlob =
          platforms.length === 1
            ? platforms
            : `{${cliConfig.platforms.join(",")}}`;

        const filters = `--filter "@interchain-ui/${platformGlob}"`;

        const buildCmd = `pnpm run --stream ${filters} build`;

        try {
          await exec(buildCmd);

          if (shouldMinify) {
            const minifyCssCmd = `pnpm run --stream ${filters} minifyCss`;
            await exec(minifyCssCmd);
          }
        } catch (error) {
          throw new Error(`Error bundling packages ${error}`);
        }
      },
    },
  ]);

  tasks.run().catch((err: Error) => {
    console.error(err);
  });
})();
