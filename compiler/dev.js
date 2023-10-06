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
        execa("yarn clear:artifacts && yarn clear:builds").catch(() => {
          throw new Error("Cannot remove output directory");
        }),
    },
    {
      title: "Compile React Components",
      task: () =>
        compileReact().catch((error) => {
          throw new Error("[Dev] Error task compile react components " + error);
        }),
    },
    {
      title: "Watching /src ...",
      task: () => {
        const compileWithCancelToken = (watcherEvent, token) => {
          return new Promise(function (resolve, reject) {
            compileReact(watcherEvent).then(resolve).catch(reject);

            token.cancel = function () {
              reject(new Error("Cancelled"));
            };
          });
        };

        const compile = last(compileWithCancelToken);

        return new Listr([
          {
            title: "Recompile Mitosis",
            task: async () => {
              const srcDir = path.resolve(process.cwd(), "src");
              const scaffoldDir = path.resolve(
                process.cwd(),
                "packages/react/scaffolds"
              );

              const onChange = lodash.debounce((err, _events) => {
                const spinner = ora(`Watching src/ for changes...`).start();
                spinner.text = `src/ changed, compiling...`;

                const t = +Date.now();
                const timingLabel = `[t:${t}] Recompile took`;
                console.time(timingLabel);

                compile(_events)
                  .then(() => {
                    spinner.succeed("Compiled successfully.");
                    console.timeEnd(timingLabel);
                  })
                  .catch((e) => {
                    spinner.fail(`Error compiling mitosis ${e.message}.`);
                  });

                if (err) {
                  spinner.fail(
                    `Error watching src/ for changes ${err?.message}.`
                  );
                  return;
                }
              }, 500);

              let watchSrc = watcher.subscribe(srcDir, (err, _events) => {
                onChange(err, _events);
              });

              let watchScaffold = watcher.subscribe(
                scaffoldDir,
                (err, _events) => {
                  onChange(err, _events);
                }
              );

              return Promise.all([watchSrc, watchScaffold]).then(
                (subscriptions) => {
                  unsub = () => {
                    subscriptions.forEach((subscription) => {
                      if (
                        subscription &&
                        typeof subscription.unsubscribe === "function"
                      ) {
                        subscription.unsubscribe();
                      }
                    });
                  };
                }
              );
            },
            options: {
              persistentOutput: true,
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

function last(fn) {
  const lastToken = { cancel: function () {} }; // start with no op

  return function executor() {
    lastToken.cancel();
    const args = Array.prototype.slice.call(arguments);
    args.push(lastToken);
    return fn.apply(this, args);
  };
}
