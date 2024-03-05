const fs = require("fs-extra");
const glob = require("glob");
const compiler = require("../base.js");

const DEFAULT_OPTIONS = {
  target: "vue",
  extension: "vue",
  api: "composition",
  state: "",
  styles: "",
};

function customReplaceVue(props) {
  const { name, pascalName, outFile, outPath, isFirstCompilation } = props;

  if (isFirstCompilation) {
    const data = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

    // NOTE: debug only
    console.log(
      "\x1b[34m%s\x1b[0m",
      "\n ============== before =========== \n" + data
    );

    const result = data
      // Add .vue to index
      .replace(
        /(export)(.*)\/ui\/(?!.*(\.css|\.css\.ts)")(.+)";/g,
        `$1$2/ui/$3/$3.vue";`
      )
      .replace(/(extensions)\/(.*)\.vue/g, "$1/$2")
      .replace(/\/helpers\.vue/g, "");

    console.log(
      "\x1b[33m%s\x1b[0m",
      "\n ============== after =========== \n" + result
    );

    fs.writeFileSync(`${outPath}/src/index.ts`, result, "utf8");

    // Add .vue extension to all the indexes in src folder
    glob.sync(`${outPath}/src/ui/**/index.ts`).map((src) => {
      const data = fs
        .readFileSync(src, "utf8")
        // add vue to index
        .replace(/(export { default } from)(.*)(';)/g, "$1$2.vue$3")
        // but remove from hooks
        .replace(/\.hook\.vue/g, ".hook");

      fs.writeFileSync(src, data, "utf8");
    });
  }

  const data = fs.readFileSync(outFile, "utf8");

  let result = data;

  result =
    // Mitosis don't understand the destructure of someFn({...props}) yet, so it outputs `props.props`, we only need `props`
    result.replace(/props\.props/g, "props");

  fs.writeFileSync(outFile, result, "utf8");
}

const compileVue = async () => {
  await compiler.compile({
    ...DEFAULT_OPTIONS,
    customReplace: customReplaceVue,
  });
};

if (require.main === module) {
  // Call directly through CLI
  (async () => {
    await compileVue();
  })();
}
