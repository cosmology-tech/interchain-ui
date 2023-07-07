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
const _ = require("lodash");
const scaffoldConfig = require("./scaffold.config.js");

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

function pascalName(str) {
  return _.startCase(str).replace(/\s/g, "");
}

function getScaffoldsDirs(rootPath) {
  return {
    inDir: `${rootPath}/scaffolds`,
    outDir: `${rootPath}/src/ui`,
  };
}

const fileCache = new Map();

function getFileModifiedTime(filePath) {
  try {
    const fileStats = fs.statSync(filePath);
    return fileStats.mtime;
  } catch (err) {
    console.error("Cannot build file cache", err);
  } finally {
    return null;
  }
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

  const spinner = ora().start();
  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  function copyNonMitosisLiteFiles(scaffoldsExist = false) {
    // Move src to all the package folder
    fs.copySync("src", `${outPath}/src`);

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.lite.tsx`);
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

    let fileExports = "$2";

    // Export only the elements we want in case flag --elements is provided
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
    let indexResult = indexData
      // Export only needed components
      .replace(
        /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
        `$1\n${fileExports}\n$3`
      )
      .replace(/Platform.Default/g, `Platform.${pascalName(options.target)}`);

    // Adding scaffolds imports to index.ts
    if (scaffoldsExist) {
      const scaffoldNames = Object.keys(scaffoldConfig).map((name) => ({
        name,
        Comp: pascalName(name),
      }));

      const scaffoldImports = scaffoldNames
        .map(
          (item) =>
            `export { default as ${item.Comp} } from './ui/${item.name}';`
        )
        .join("\n");

      indexResult = indexResult.replace(
        /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
        `$1$2${scaffoldImports}\n$3`
      );
    }

    fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, "utf8");
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

  const isFirstCompilation = !fs.existsSync(`${outPath}/src`);

  // Build a cache of modified time for every file
  if (isFirstCompilation) {
    for (const filename of files) {
      if (!fileCache.has(filename)) {
        const mtime = getFileModifiedTime(filename);
        fileCache.set(filename, mtime);
      }
    }
  }

  for (const fileName of files) {
    const file = path.parse(fileName);
    const name = file.name.replace(".lite", "");

    // Copying files
    const { inDir, outDir } = getScaffoldsDirs(outPath);
    const scaffoldsExist = fs.existsSync(inDir);
    copyNonMitosisLiteFiles(scaffoldsExist);

    if (scaffoldsExist && !isFirstCompilation) {
      fs.copySync(inDir, outDir);
    }

    // Skip work if file unchanged
    const fileModifiedTime = getFileModifiedTime(fileName);
    let putCache = false;

    if (!isFirstCompilation) {
      if (
        fileCache.has(fileName) &&
        fileCache.get(fileName) === fileModifiedTime
      ) {
        continue;
      } else {
        putCache = true;
      }
    }

    // Compile using Mitosis CLI
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

    if (putCache) {
      const fileModifiedTime = getFileModifiedTime(fileName);
      fileCache.set(fileName, fileModifiedTime);
    }

    spinner.succeed(`Compiled ${fileName}`);
  }

  spinner.stop();
}

module.exports = {
  compile,
};
