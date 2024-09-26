import { Listr, ListrTask } from "listr2";
import path from "path";
import ora from "ora";
import watcher, { Event } from "@parcel/watcher";
import lodash from "lodash";
import { compileReact } from "./frameworks/react.compile";
import { command as execa } from "execa";

(async () => {
  let unsub: (() => void) | undefined;

  const tasks = new Listr([
    {
      title: "Clean output",
      task: () =>
        execa("pnpm run clear:artifacts && pnpm run clear:builds").catch(() => {
          throw new Error("Cannot remove output directory");
        }),
    },
    {
      title: "Compile React Components",
      task: () =>
        compileReact().catch((error: Error) => {
          throw new Error(
            "[Dev] Error task compile react components " + error.message,
          );
        }),
    },
    {
      title: "Watching /src ...",
      task: () => {
        const compileWithCancelToken = (
          watcherEvents: Event[],
          token: { cancel: () => void },
        ) => {
          return new Promise<void>((resolve, reject) => {
            compileReact(watcherEvents).then(resolve).catch(reject);

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
                "packages/react/scaffolds",
              );

              const onChange = lodash.debounce(
                (err: Error | null, _events: Array<watcher.Event>) => {
                  const spinner = ora(`Watching src/ for changes...`).start();
                  spinner.text = `src/ changed, compiling...`;

                  const t = +Date.now();
                  const timingLabel = `[t:${t}] Recompile took`;
                  console.time(timingLabel);

                  compile(_events, { cancel: () => {} })
                    .then(() => {
                      spinner.succeed("Compiled successfully.");
                      console.timeEnd(timingLabel);
                    })
                    .catch((e: Error) => {
                      spinner.fail(`Error compiling mitosis ${e.message}.`);
                    });

                  if (err) {
                    spinner.fail(
                      `Error watching src/ for changes ${err?.message}.`,
                    );
                    return;
                  }
                },
                500,
              );

              const watchSrc = watcher.subscribe(srcDir, (err, _events) => {
                onChange(err, _events);
              });

              const watchScaffold = watcher.subscribe(
                scaffoldDir,
                (err, _events) => {
                  onChange(err, _events);
                },
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
                },
              );
            },
          } as ListrTask,
        ]);
      },
    },
  ]);

  tasks.run().catch((err: Error) => {
    if (unsub) unsub();
    console.error(err);
  });
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function last<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const lastToken = { cancel: () => {} }; // start with no op

  return function executor(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> {
    lastToken.cancel();
    args.push(lastToken as never);
    return fn.apply(this, args);
  };
}
