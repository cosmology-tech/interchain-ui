// @ts-check
const glob = require("glob");
const fsPromise = require("fs/promises");
const fs = require("fs-extra");
const path = require("path");
const filesystemTools = require("gluegun/filesystem");
const stringTools = require("gluegun/strings");
const printTools = require("gluegun/print");
const commandLineArgs = require("command-line-args");
const ora = require("ora");
const compileCommand = require("@builder.io/mitosis-cli/dist/commands/compile");
const camelCase = require("lodash/camelCase");
const startCase = require("lodash/startCase");
const scaffoldConfig = require("./scaffold.config.js");
const { cwd } = require("process");
const { Cache } = require("./cache.js");
const { fixReactTypeIssues } = require("./plugins/react.plugin");

const cache = new Cache();

// Only allow these components for each target, if null = allow all
const compileAllowList = {
  react: null,
  vue: [
    "avatar",
    "animate-layout",
    "box",
    "text",
    "button",
    "callout",
    "stack",
    "center",
  ],
};

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

async function compile(rawOptions) {
  const { watcherEvents, ...defaultOptions } = rawOptions;

  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
  };

  const cliConfig = commandLineArgs(optionDefinitions);

  const globLiteTsxFiles = (file) =>
    glob.sync(`src/**/${file}/${file}.lite.tsx`);

  // String or array of strings of glob patterns
  const elementsFilter = cliConfig.elements
    ? cliConfig.elements
    : options.elements;

  options.elements = elementsFilter;
  options.isDev = !!cliConfig.dev;

  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements);

  const filteredGlobbedFiles = compileAllowList[options.target]
    ? files.filter((file) => {
        return compileAllowList[options.target]
          .map(
            (allowedElement) =>
              `src/ui/${allowedElement}/${allowedElement}.lite.tsx`
          )
          .some((allowed) => allowed === file);
      })
    : files;

  const outPath = `${options.dest}/${options.target}`;

  function copyNonMitosisLiteFiles(isFirstRun = false, scaffoldsExist = false) {
    if (!isFirstRun) {
      return;
    }

    // Move src to all the package folder
    fs.copySync("src", `${outPath}/src`);

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.lite.tsx`);
    unnecessaryFiles.forEach((element) => fs.removeSync(element));

    // Output file to <package>/src
    const targetSrcFiles = glob.sync(`${outPath}/src/**/*.{ts,tsx}`);

    targetSrcFiles.forEach((element) => {
      const data = fs.readFileSync(element, "utf8");

      let result = removeLiteExtension(
        // Fix alias
        data.replace(/\~\//g, "../../")
      );

      if (options.target === "react") {
        result = fixReactTypeIssues(result);
      }

      fs.writeFileSync(element, result, "utf8");
    });

    let fileExports = "$2";

    // Export only the elements we want with matching filters:
    // - CLI flag --elements
    // - allowList
    const doesTargetHaveAllowList = compileAllowList[options.target] != null;

    if (cliConfig.elements || doesTargetHaveAllowList) {
      const filterWithAllowList = (elements) => {
        const elementsToFilter = doesTargetHaveAllowList
          ? compileAllowList[options.target].map(
              (allowedElement) =>
                `src/ui/${allowedElement}/${allowedElement}.lite.tsx`
            )
          : toArray(elements);

        return elementsToFilter;
      };

      fileExports = filterWithAllowList(options.elements)
        .map((fileName) => {
          console.log("[export] ", fileName);
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

  async function handleWatcherEvents(watcherEvents) {
    // Watcher event has shape Array<{ path: <string>, type: 'update' | 'create' | 'delete' }>
    const event = watcherEvents[0];

    // example parsed path
    // {
    //   root: '/',
    //   dir: '/Users/fatg/workspace/cosmology/interchain-ui/src/ui/asset-item-transfer',
    //   base: 'asset-item-transfer.css.ts',
    //   ext: '.ts',
    //   name: 'asset-item-transfer.css'
    // }
    const parsedPath = path.parse(event.path);

    const isLiteJSXComponent =
      parsedPath.ext === ".tsx" && parsedPath.name.includes(".lite");
    const isScaffold = parsedPath.dir.includes("scaffolds");

    const targetPath = path.join(
      outPath,
      parsedPath.dir.slice(parsedPath.dir.indexOf("src")),
      parsedPath.base
    );

    if (event.type === "create" || event.type === "update") {
      // Only process non lite jsx files in this handler
      if (isLiteJSXComponent || isScaffold) return;

      try {
        const fileContent = await fsPromise.readFile(event.path, "utf-8");
        await fsPromise.writeFile(targetPath, removeLiteExtension(fileContent));
      } catch (err) {
        console.log(`handleWatcherEvents() [${event.type}] event error `, err);
      }
    }

    if (event.type === "delete") {
      try {
        await fsPromise.unlink(targetPath);
      } catch (err) {
        console.log("handleWatcherEvents() [delete] event error ", err);
      }
    }
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${file.dir}/${file.name.replace(".lite", "")}.${
      options.extension
    }`;

    let to =
      options.target === "webcomponents" ? "webcomponent" : options.target;
    to = to === "vue" ? "vue3" : to;

    await compileCommand.run({
      parameters: {
        options: {
          from: "mitosis",
          to: to,
          out: outFile,
          force: true,
          api: options.api,
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

  async function addReactSpecificCode() {
    const targetRootPath = path.resolve(
      cwd(),
      `packages/${options.target}/src`
    );
    const indexPath = path.resolve(targetRootPath, "index.ts");
    const hooksPath = path.resolve(targetRootPath, "ui", "hooks");

    return fsPromise
      .readdir(hooksPath)
      .then((hookFolders) => {
        const hookNamesByFolder = hookFolders.reduce((arr, folder) => {
          // @ts-ignore
          arr.push({ folder, hookName: camelCase(folder) });
          return arr;
        }, []);

        const indexData = fs.readFileSync(indexPath, "utf8");

        const hooksExports = hookNamesByFolder
          .map(
            (item) =>
              `export { default as ${item.hookName} } from './ui/hooks/${item.folder}';`
          )
          .filter((exportLine) => {
            // Don't include exports if it's already there
            return indexData.indexOf(exportLine) === -1;
          })
          .join("\n");

        const clientOnlyMarker = `import "client-only";`;

        const indexResult = `${indexData}\n${clientOnlyMarker}\n${hooksExports}`;

        // Skip if hooks exports are the same
        if (indexResult === indexData) {
          return;
        }

        fs.writeFileSync(indexPath, indexResult, "utf8");
      })
      .catch((err) => {
        console.log("Failed to add hooks exports", err);
      });
  }

  function replacePropertiesFromCompiledFiles(outFile) {
    const data = fs.readFileSync(outFile, "utf8");
    let result = data
      // Fix alias
      .replace(/\~\//g, "../../");

    fs.writeFileSync(outFile, result, "utf8");
  }

  const spinner = ora(`>> Compiling [${options.target}]`).start();

  for (const fileName of filteredGlobbedFiles) {
    // console.log("\n[Mitosis compile] ", fileName);
    const isFirstCompilation =
      !fs.existsSync(`${outPath}/src`) || options.isDev;
    const file = path.parse(fileName);
    const name = file.name.replace(".lite", "");

    // Copying files
    const { inDir, outDir } = getScaffoldsDirs(outPath);
    const scaffoldsExist = fs.existsSync(inDir);

    copyNonMitosisLiteFiles(isFirstCompilation, scaffoldsExist);

    if (scaffoldsExist) {
      fs.copySync(inDir, outDir);
    }

    const changed = await cache.isChanged(fileName);

    if (!changed) {
      continue;
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

    spinner.text = `[Done] ${fileName}`;
  }

  if (watcherEvents) {
    await handleWatcherEvents(watcherEvents);
  }

  if (!cache.isPopulated) {
    await cache.build(files);
  }

  if (options.target === "react") {
    addReactSpecificCode();
  }

  spinner.succeed();
  spinner.stop();
}

module.exports = {
  compile,
};

function pascalName(str) {
  return startCase(str).replace(/\s/g, "");
}

function getScaffoldsDirs(rootPath) {
  return {
    inDir: `${rootPath}/scaffolds`,
    outDir: `${rootPath}/src/ui`,
  };
}

function removeLiteExtension(fileContent) {
  return fileContent.replace(/\.lite/g, "");
}

function toArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
