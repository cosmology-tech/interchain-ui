// @ts-check
const fs = require("fs-extra");
const compiler = require("../base");
const { fixReactTypeIssues } = require("../plugins/react.plugin");
const log = require("../log");

const DEFAULT_OPTIONS = {
  target: "react",
  extension: "tsx",
  state: "useState",
  styles: "style-tag",
};

function customReplaceReact(props) {
  const { name, pascalName, outFile, _outPath, _isFirstCompilation } = props;
  log.info(`\nCompiling ${name} [${pascalName}] for React...`);

  const data = fs.readFileSync(outFile, "utf8");

  let result = fixReactTypeIssues(data);

  fs.writeFileSync(outFile, result, "utf8");
}

async function compileReact(watcherEvents) {
  await compiler.compile({
    ...DEFAULT_OPTIONS,
    watcherEvents,
    customReplace: customReplaceReact,
  });
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
