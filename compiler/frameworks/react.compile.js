// @ts-check
const compiler = require("../base");

const DEFAULT_OPTIONS = {
  target: "react",
  extension: "tsx",
  state: "useState",
  styles: "style-tag",
};

async function compileReact(watcherEvents) {
  await compiler.compile({ ...DEFAULT_OPTIONS, watcherEvents });
}
module.exports = {
  compileReact,
};

if (require.main === module) {
  // Call directly through CLI
  (async () => {
    await compileReact();
  })();
}
