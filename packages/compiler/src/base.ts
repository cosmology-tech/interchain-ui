import glob from "glob";
import fsPromise from "fs/promises";
import fs from "fs-extra";
import path from "node:path";
import { cwd } from "node:process";
// import { filesystem as filesystemTools } from "gluegun/filesystem";
// import { strings as stringTools } from "gluegun/strings";
// import { print as printTools } from "gluegun/print";
import commandLineArgs from "command-line-args";
import ora from "ora";
import { Event } from "@parcel/watcher";
// @ts-ignore
import compileCommand from "@builder.io/mitosis-cli/dist/commands/compile";
import camelCase from "lodash/camelCase";
import startCase from "lodash/startCase";
import * as scaffolds from "./scaffold.config.js";
import { Cache } from "./cache";
import { fixReactTypeIssues } from "./utils/react.utils";

const cache = new Cache();

const { scaffoldConfig, compileAllowList } = scaffolds;

type ValidTarget = "react" | "vue";

interface CompileOptions {
  elements: string | string[];
  dest: string;
  options: Record<string, unknown>;
  target: string;
  extension: string;
  state: string;
  styles: string;
  customReplace: (outFile: string, isFirstCompilation: boolean) => void | null;
  isDev?: boolean;
}

const DEFAULT_OPTIONS: CompileOptions = {
  elements: "src/**/*.lite.tsx",
  dest: "packages",
  options: {},
  target: "",
  extension: "",
  state: "",
  styles: "",
  customReplace: (_outFile: string, _isFirstCompilation: boolean) => null,
};

const optionDefinitions = [
  { name: "elements", alias: "e", type: String, multiple: true },
  { name: "dev", type: Boolean },
];

function applyFixReactTypeIssues(
  content: string,
  filePath: string,
  target: string,
): string {
  if (target === "react" && !filePath.endsWith(".lite.tsx")) {
    return fixReactTypeIssues(content);
  }
  return content;
}

function stripVueJsxExtension(filePath: string): string {
  // .lite.tsx file is processed by Mitosis compiler
  if (filePath.endsWith(".lite.tsx")) {
    return filePath;
  }

  return filePath.endsWith(".tsx")
    ? filePath.replace(/\.tsx$/, ".ts")
    : filePath;
}

interface CompileParams {
  watcherEvents?: Event[];
  [key: string]: unknown;
}

export async function compile(rawOptions: CompileParams): Promise<void> {
  const { watcherEvents, ...defaultOptions } = rawOptions;

  const options: CompileOptions = {
    ...DEFAULT_OPTIONS,
    ...(defaultOptions as Partial<CompileOptions>),
  };

  const cliConfig = commandLineArgs(optionDefinitions);

  // String or array of strings of glob patterns
  const elementsFilter = cliConfig.elements
    ? cliConfig.elements
    : options.elements;

  options.elements = elementsFilter;
  options.isDev = !!cliConfig.dev;

  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements as string);

  const targetAllowList = compileAllowList[options.target as ValidTarget];

  const filteredGlobbedFiles = targetAllowList
    ? (files as string[]).filter((file: string) => {
        return (targetAllowList ?? [])
          .map(
            (allowedElement) =>
              `src/ui/${allowedElement}/${allowedElement}.lite.tsx`,
          )
          .some((allowed) => allowed === file);
      })
    : files;

  const outPath = `${options.dest}/${options.target}`;

  function copyNonMitosisLiteFiles(
    isFirstRun = false,
    scaffoldsExist = false,
  ): void {
    if (!isFirstRun) {
      return;
    }

    // Move src to all the package folder
    const srcFiles = glob.sync("src/**/*");
    const allowList = compileAllowList[options.target as ValidTarget];
    const doesTargetHaveAllowList = allowList != null;

    srcFiles.forEach((file: string) => {
      const relativePath = path.relative("src", file);
      let destPath = path.join(outPath, "src", relativePath);

      if (doesTargetHaveAllowList && !file.startsWith("src/ui/shared")) {
        const isAllowed = allowList.some(
          (allowed: string) =>
            file.includes(`src/ui/${allowed}/`) || !file.startsWith("src/ui/"),
        );
        if (!isAllowed) return;
      }

      if (fs.lstatSync(file).isDirectory()) {
        fs.ensureDirSync(destPath);
      } else {
        if (options.target === "vue") {
          destPath = stripVueJsxExtension(destPath);
        }
        fs.copySync(file, destPath);
      }
    });

    // For Vue, we need to add .vue to the export statement
    if (options.target === "vue") {
      const reExportIndexFiles = glob.sync(`${outPath}/src/ui/**/index.ts`);

      reExportIndexFiles.forEach((indexFile: string) => {
        const data = fs.readFileSync(indexFile, "utf8");
        const result = addVueExtension(data);
        fs.writeFileSync(indexFile, result, "utf8");
      });

      copyFiles(`${outPath}/typings`, `${outPath}/src`);
    }

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.lite.tsx`);
    unnecessaryFiles.forEach((element: string) => fs.removeSync(element));

    // Output file to <package>/src
    const targetSrcFiles = glob.sync(`${outPath}/src/**/*.{ts,tsx}`);

    targetSrcFiles.forEach((element: string) => {
      const data = fs.readFileSync(element, "utf8");

      let result = removeLiteExtension(
        // Fix alias
        data.replace(/\~\//g, "../../"),
      );

      result = applyFixReactTypeIssues(result, element, options.target);

      fs.writeFileSync(element, result, "utf8");
    });

    let fileExports = "$2";

    // Export only the elements we want with matching filters:
    // - CLI flag --elements
    // - allowList
    if (cliConfig.elements || doesTargetHaveAllowList) {
      const filterWithAllowList = (elements: string | string[]): string[] => {
        const elementsToFilter = doesTargetHaveAllowList
          ? (targetAllowList ?? []).map(
              (allowedElement: string) =>
                `src/ui/${allowedElement}/${allowedElement}.lite.tsx`,
            )
          : toArray(elements);

        return elementsToFilter;
      };

      fileExports = filterWithAllowList(options.elements)
        .map((fileName: string) => {
          const file = path.parse(fileName);
          const name = file.name.replace(".lite", "");
          return `export { default as ${pascalName(
            name,
          )} } from './${file.dir.replace("src/", "")}';`;
        })
        .join("\n");
    }

    const indexData = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

    let indexResult = indexData
      // Export only needed components
      .replace(
        /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
        `$1\n${fileExports}\n$3`,
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
            `export { default as ${item.Comp} } from './ui/${item.name}';`,
        )
        .join("\n");

      indexResult = indexResult.replace(
        /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
        `$1$2${scaffoldImports}\n$3`,
      );
    }

    fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, "utf8");
  }

  async function handleWatcherEvents(watcherEvents: Event[]): Promise<void> {
    // Watcher event has shape Array<{ path: <string>, type: 'update' | 'create' | 'delete' }>
    const event = watcherEvents[0];

    const parsedPath = path.parse(event.path);

    const isLiteJSXComponent =
      parsedPath.ext === ".tsx" && parsedPath.name.includes(".lite");
    const isScaffold = parsedPath.dir.includes("scaffolds");

    let targetPath = path.join(
      outPath,
      parsedPath.dir.slice(parsedPath.dir.indexOf("src")),
      parsedPath.base,
    );

    if (options.target === "vue") {
      targetPath = stripVueJsxExtension(targetPath);
    }

    if (event.type === "create" || event.type === "update") {
      // Only process non lite jsx files in this handler
      if (isLiteJSXComponent || isScaffold) return;

      try {
        let fileContent = await fsPromise.readFile(event.path, "utf-8");
        fileContent = removeLiteExtension(fileContent);

        fileContent = applyFixReactTypeIssues(
          fileContent,
          event.path,
          options.target,
        );

        await fsPromise.writeFile(targetPath, fileContent);
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

  async function compileMitosisComponent(
    filepath: string,
  ): Promise<{ outFile: string }> {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${file.dir}/${file.name.replace(".lite", "")}.${
      options.extension
    }`;

    const to =
      options.target === "webcomponents" ? "webcomponent" : options.target;

    await compileCommand.run({
      parameters: {
        options: {
          from: "mitosis",
          to: to,
          out: outFile,
          force: true,
          // @ts-ignore
          api: options.api,
          state: options.state,
          styles: options.styles,
          outFile: outPath,
          config: path.resolve(__dirname, "./mitosis.config.js"),
        },
        array: [filepath],
      },
      // strings: stringTools,
      // filesystem: filesystemTools,
      // print: { ...printTools },
    });

    return {
      outFile,
    };
  }

  async function addReactRSCPatch(): Promise<void> {
    const targetRootPath = path.resolve(
      cwd(),
      `packages/${options.target}/src`,
    );
    const indexPath = path.resolve(targetRootPath, "index.ts");
    const hooksPath = path.resolve(targetRootPath, "ui", "hooks");

    return fsPromise
      .readdir(hooksPath)
      .then((hookFolders) => {
        const hookNamesByFolder = hookFolders.reduce(
          (arr: { folder: string; hookName: string }[], folder: string) => {
            arr.push({ folder, hookName: camelCase(folder) });
            return arr;
          },
          [],
        );

        const indexData = fs.readFileSync(indexPath, "utf8");

        const hooksExports = hookNamesByFolder
          .map(
            (item) =>
              `export { default as ${item.hookName} } from './ui/hooks/${item.folder}';`,
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

  function replacePropertiesFromCompiledFiles(outFile: string): void {
    const data = fs.readFileSync(outFile, "utf8");
    const result = data
      // Fix alias
      .replace(/\~\//g, "../../");

    fs.writeFileSync(outFile, result, "utf8");
  }

  const spinner = ora(`>> Compiling [${options.target}]`).start();

  for (const fileName of filteredGlobbedFiles) {
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
    options.customReplace(outFile, isFirstCompilation);

    spinner.text = `[Done] ${fileName}`;
  }

  if (watcherEvents) {
    await handleWatcherEvents(watcherEvents);
  }

  if (!cache.isPopulated && files) {
    await cache.build(Array.isArray(files) ? files : [files]);
  }

  if (options.target === "react") {
    addReactRSCPatch();
  }

  spinner.succeed();
  spinner.stop();
}

function pascalName(str: string): string {
  return startCase(str).replace(/\s/g, "");
}

function getScaffoldsDirs(rootPath: string): { inDir: string; outDir: string } {
  return {
    inDir: `${rootPath}/scaffolds`,
    outDir: `${rootPath}/src/ui`,
  };
}

function removeLiteExtension(fileContent: string): string {
  return fileContent.replace(/\.lite/g, "");
}

function toArray<T>(maybeArray: T | T[]): T[] {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function addVueExtension(inputString: string): string {
  return inputString.replace(/(\.[^"';\s]+)("|')/g, "$1.vue$2");
}

async function copyFiles(srcDir: string, destDir: string): Promise<void> {
  try {
    // Ensure the destination directory exists, if not create it
    await fs.mkdir(destDir, { recursive: true });

    // Read all the files from the source directory
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      // Construct full file paths for both the source and destination
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      // Check if the source is indeed a file and not a directory
      const stat = await fs.stat(srcFile);
      if (stat.isFile()) {
        // Copy each file to the destination directory
        await fs.copyFile(srcFile, destFile);
      }
    }
  } catch (error) {
    console.error("Error copying files:", error);
  }
}
