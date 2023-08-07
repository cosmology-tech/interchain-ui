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
        compileReact().catch((error) => {
          throw new Error("[Dev] Error task compile react components " + error);
        }),
    },
    {
      title: "Watching /src ...",
      task: () => {
        const compileWithCancelToken = (token) => {
          return new Promise(function (resolve, reject) {
            compileReact().then(resolve).catch(reject);

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
              const watchDir = path.resolve(process.cwd(), "src");

              const onChange = lodash.debounce((t, err, _events) => {
                console.log("Change", _events);
                const spinner = ora(`Watching src/ for changes...`).start();
                spinner.text = `src/ changed, compiling...`;

                console.time(`[t:${t}] Recompile took`);

                compile()
                  .then(() => {
                    spinner.succeed("Compiled successfully.");
                    console.time(`[t:${t}] Recompile took`);
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

              let watch = watcher.subscribe(watchDir, (err, _events) => {
                const t = +new Date();
                onChange(t, err, _events);
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
