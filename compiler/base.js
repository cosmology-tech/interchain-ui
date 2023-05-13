// @ts-check
const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");
const filesystemTools = require("gluegun/filesystem");
const stringTools = require("gluegun/strings");
const printTools = require("gluegun/print");
const commandLineArgs = require("command-line-args");
const ora = require("ora");
const compileCommand = require("@builder.io/mitosis-cli/dist/commands/compile");

const DEFAULT_OPTIONS = {
  elements: "src/**/*.lite.tsx",
  dest: "packages",
  options: {},
  target: "",
  extension: "",
  state: "",
  styles: "",
  customReplace: (_outFile, _isFirstCompilation) => null,
};

const optionDefinitions = [
  { name: "elements", alias: "e", type: String, multiple: true },
  { name: "dev", type: Boolean },
];

function pascalName(string) {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.elements = cliConfig.elements
    ? cliConfig.elements
        .map((file) => glob.sync(`src/**/${file}/${file}.lite.tsx`))
        .flat()
    : options.elements;
  options.isDev = !!cliConfig.dev;

  const spinner = ora("Compiling").start();
  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  function copyNonMitosisLiteFiles() {
    // Move src to all the package folder
    fs.copySync("src", `${outPath}/src`);

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.{mdx,lite.tsx}`);
    unnecessaryFiles.forEach((element) => fs.removeSync(element));

    // Fix aliases
    const distFiles = glob.sync(`${outPath}/src/**/*.{ts,css}`);
    distFiles.forEach((element) => {
      const data = fs.readFileSync(element, "utf8");
      const result = data
        // Fix alias
        .replace(/\~\//g, "../../")
        // Remove .lite
        .replace(/\.lite/g, "");

      fs.writeFileSync(element, result, "utf8");
    });

    // Create specific README
    const data = fs.readFileSync("README.md", "utf8");
    const result = data.replace(/\/\[target\].+/g, `/${options.target}`);

    fs.writeFileSync(`${outPath}/README.md`, result, "utf8");

    let fileExports = "$2";

    // Export only the elements we want
    if (cliConfig.elements) {
      fileExports = options.elements
        .map((fileName) => {
          const file = path.parse(fileName);
          const name = file.name.replace(".lite", "");
          return `export { default as ${pascalName(
            name
          )} } from './${file.dir.replace("src/", "")}';`;
        })
        .join("\n");
    }

    const indexData = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");
    const indexResult = indexData
      // Export only needed components
      .replace(
        /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
        `$1\n${fileExports}\n$3`
      )
      .replace(/Platform.Default/g, `Platform.${pascalName(options.target)}`);

    fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, "utf8");
  }

  function copyScaffoldsIntoSrcDir() {
    const inputDir = `${outPath}/scaffolds`;
    if (!fs.existsSync(inputDir)) return;
    fs.copySync(inputDir, `${outPath}/src/ui`);
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${file.dir}/${file.name.replace(".lite", "")}.${
      options.extension
    }`;

    await compileCommand.run({
      parameters: {
        options: {
          from: "mitosis",
          to: options.target,
          out: outFile,
          force: true,
          state: options.state,
          styles: options.styles,
          config: "./compiler/mitosis.config.js",
        },
        array: [filepath],
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: { ...printTools.print, info: () => null },
    });

    return {
      outFile,
    };
  }

  function replacePropertiesFromCompiledFiles(outFile) {
    const data = fs.readFileSync(outFile, "utf8");
    let result = data
      // Fix alias
      .replace(/\~\//g, "../../");

    fs.writeFileSync(outFile, result, "utf8");
  }

  for (const fileName of files) {
    const file = path.parse(fileName);
    const isFirstCompilation =
      !fs.existsSync(`${outPath}/src`) || options.isDev;
    const name = file.name.replace(".lite", "");
    spinner.text = fileName;

    copyNonMitosisLiteFiles();
    copyScaffoldsIntoSrcDir();

    const { outFile } = await compileMitosisComponent(fileName);
    replacePropertiesFromCompiledFiles(outFile);
    options.customReplace({
      name,
      pascalName: pascalName(name),
      file,
      outFile,
      outPath,
      isFirstCompilation,
    });
    spinner.stop();
  }
}

module.exports = {
  compile,
};
