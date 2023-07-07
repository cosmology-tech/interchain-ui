// @ts-check
const { Listr } = require("listr2");
const path = require("path");
const ora = require("ora");
const watcher = require("@parcel/watcher");
const lodash = require("lodash");
const { compileReact } = require("./frameworks/react.compile");

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
      title: "Watching /src ...",
      task: () => {
        return new Listr([
          {
            title: "Recompile Mitosis",
            task: async () => {
              const watchDir = path.resolve(process.cwd(), "src");

              const onChange = lodash.debounce((err, _events) => {
                const spinner = ora(`Watching src/ for changes...`).start();
                spinner.text = `src/ changed, compiling...`;

                console.time("Recompile took");

                compileReact()
                  .then(() => {
                    spinner.text = "Compiled successfully.";
                    spinner.succeed();
                    console.timeEnd("Recompile took");
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
              }, 200);

              let watch = watcher.subscribe(watchDir, (err, _events) => {
                onChange(err, _events);
              });

              return watch.then((subscription) => {
                unsub = () => subscription.unsubscribe();
              });
            },
          },
        ]);
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
