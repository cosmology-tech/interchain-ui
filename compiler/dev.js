// @ts-check
const { Listr } = require("listr2");
const watcher = require("@parcel/watcher");
const path = require("path");
const ora = require("ora");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

(async () => {
  const execa = (await import("execa")).command;

  let unsub;

  const tasks = new Listr([
    {
      title: "Clean output",
      task: () =>
        execa("pnpm run clean").catch(() => {
          throw new Error("Cannot remove output directory");
        }),
    },
    {
      title: "Compile React Components",
      task: () =>
        execa("node ./compiler/frameworks/react.compile").catch((error) => {
          throw new Error("Error compiling React" + error);
        }),
    },
    {
      title: "Bundle React",
      task: async () => {
        try {
          await exec(`pnpm --filter "@cosmology-mitosis/react" run build`);
        } catch (error) {
          throw new Error("Error bundling React " + error);
        }
      },
    },
    {
      title: "Launch Watcher",
      task: async (ctx, task) => {
        task.title = "Watching for changes";
        const watchDir = path.resolve(process.cwd(), "src");

        const recompile = async () => {
          try {
            // await execa("node ./compiler/frameworks/react.compile.js --dev");
            // await execa(`pnpm --filter "@cosmology-mitosis/react" run build`);
            await exec("node ./compiler/frameworks/react.compile");
            await exec(`pnpm --filter "@cosmology-mitosis/react" run build`);
          } catch (e) {
            throw e;
          }
        };

        let watch = watcher.subscribe(watchDir, (err, _events) => {
          const spinner = ora(`Watching src/ for changes...`).start();
          spinner.text = `src/ changed, compiling...`;

          recompile()
            .then(() => {
              spinner.text = "Compiled successfully.";
              spinner.succeed();
            })
            .catch((e) => {
              spinner.text = `Error compiling ${e.message}.`;
              spinner.fail();
            });

          if (err) {
            spinner.text = `Error watching src/ for changes ${err?.message}.`;
            spinner.fail();
            return;
          }
        });

        return watch.then((subscription) => {
          unsub = () => subscription.unsubscribe();
        });
      },
      options: {
        persistentOutput: true,
      },
    },
  ]);

  tasks.run().catch((err) => {
    unsub();
    console.error(err);
  });
})();
