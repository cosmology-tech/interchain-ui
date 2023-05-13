// @ts-check
const { Listr } = require("listr2");
const path = require("path");
const ora = require("ora");
const watcher = require("@parcel/watcher");
const { spawn } = require("node:child_process");

(async () => {
  const execa = (await import("execa")).command;

  let unsub;

  const tasks = new Listr([
    {
      title: "Clean output",
      task: () =>
        execa("yarn clean:assets").catch(() => {
          throw new Error("Cannot remove output directory");
        }),
    },
    {
      title: "Compile React Components",
      task: () =>
        execa("node ./compiler/frameworks/react.compile").catch((error) => {
          throw new Error("Error compiling mitosis components" + error);
        }),
    },
    {
      title: "Bundle React",
      task: async () => {
        try {
          await execa(`lerna run --scope=@cosmology-mitosis/react build`);
        } catch (error) {
          throw new Error("Error bundling react" + error);
        }
      },
    },
    {
      title: "Launch Watcher",
      task: () => {
        return new Listr(
          [
            {
              title: "Recompile Mitosis",
              task: async () => {
                const watchDir = path.resolve(process.cwd(), "src");

                const compileMitosis = async () => {
                  try {
                    await execa("node ./compiler/frameworks/react.compile");
                  } catch (err) {
                    throw new Error("Error compiling mitosis components");
                  }
                };

                let watch = watcher.subscribe(watchDir, (err, _events) => {
                  const spinner = ora(`Watching src/ for changes...`).start();
                  spinner.text = `src/ changed, compiling...`;

                  compileMitosis()
                    .then(() => {
                      spinner.text = "Compiled successfully.";
                      spinner.succeed();
                    })
                    .catch((e) => {
                      spinner.text = `Error compiling mitosis ${e.message}.`;
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
            },
            {
              title: "Parcel watch",
              task: async () => {
                return spawn(
                  "lerna run --stream --scope=@cosmology-mitosis/react watch",
                  [],
                  { shell: true }
                ).stdout;
              },
            },
          ],
          { concurrent: true }
        );
      },
    },
  ]);

  tasks.run().catch((err) => {
    unsub();
    console.error(err);
  });
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
