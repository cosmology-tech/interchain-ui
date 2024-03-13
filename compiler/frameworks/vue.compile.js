// @ts-check
const fs = require("fs-extra");
const glob = require("glob");
const compiler = require("../base.js");
const log = require("../log.js");

const DEFAULT_OPTIONS = {
  target: "vue",
  extension: "vue",
  api: "composition",
  state: "",
  styles: "",
};

function customReplaceVue(props) {
  const { name, pascalName, outFile, outPath, isFirstCompilation } = props;

  log.info(`\nCompiling ${name} [${pascalName}] for Vue...`);

  if (isFirstCompilation) {
    const data = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

    log.info("\n ============== before edit index.ts =========== \n" + data);

    const result = data
      // Add .vue to index
      .replace(
        /(export)(.*)\/ui\/(?!.*(\.css|\.css\.ts)")(.+)";/g,
        `$1$2/ui/$3/$3.vue";`,
      )
      .replace(/(extensions)\/(.*)\.vue/g, "$1/$2")
      .replace(/\/helpers\.vue/g, "");

    log.warn("\n ============== after edit index.ts =========== \n" + result);

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

  const transforms = [
    patchPropsDestructuring,
    addPathAliasToHelperTypeImports,
    addPathAliasToRelativeTypeImports,
    (fileData) => inlineTypes(fileData, name, pascalName),
  ];

  result = transforms.reduce((acc, transform) => {
    acc = transform(acc);
    return acc;
  }, result);

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

// Due to a bug in Vue SFC compiler, we need to use TS path alias for the external types to resolve correctly
function addPathAliasToHelperTypeImports(inputString) {
  // This regex matches type imports that start with "./" and captures the rest of the path
  const helpersTypeImportRe =
    /import type { ([\s\S]*?) } from "(..\/)+(models|helpers|styles)\/([\s\S]*?)"/g;

  const result = inputString.replace(
    helpersTypeImportRe,
    'import type { $1 } from "@/$3/$4"',
  );

  return result;
}

function addPathAliasToRelativeTypeImports(inputString) {
  // This regex matches type imports that start with "./" and captures the rest of the path
  // It also captures the filename without the .type extension
  const regex = /import type { ([\s\S]*?) } from "\.\/([\w-]+)\.types"/g;

  // Replace the matched import with the "@" alias, the specified path, and the filename without .type extension
  // repeated before the filename
  return inputString.replace(
    regex,
    (match, typeName, filePathWithoutExtension) => {
      // Extract the base filename without the .types extension
      const baseFilename = filePathWithoutExtension.match(/([\w-]+)$/)[0];
      // Construct the new import statement
      return `import type { ${typeName} } from "@/ui/${filePathWithoutExtension}/${baseFilename}.types"`;
    },
  );
}

// Mitosis don't understand the destructure of someFn({...props}) yet, so it outputs `props.props`, we only need `props`
function patchPropsDestructuring(inputString) {
  return inputString.replace(/props\.props/g, "props");
}

// ==================== Patching SFC compiler typescript issue ====================
// The following code is a patch for the SFC compiler issue that causes the types to be incorrectly resolved
// in short, non-trivial types must be inlined in the .vue templates and can't be accessed by referencing an external file normally like in React apps
// import type { SomeType } from "./SomeType"; <-- this doesn't work in .vue files
// More info at: https://github.com/vuejs/core/issues/8286
function getAllTheInterfacesFromPropsInComponent(result, pascalName) {
  const regex1 = /interface\s+([^{]+){([^}]+)}/g;
  const interfacesWithProps = {};
  let match;

  while ((match = regex1.exec(result)) !== null) {
    const [interfaceDef] = match;
    const interfaceName = interfaceDef
      .split("{")[0]
      .replace(/\n\s*/g, "")
      .replace(/\{/g, "")
      .replace(/interface/g, "")
      .replace(/(extends)/g, " $1")
      .replace(/(\r\n|\n|\r)/g, " ")
      .trim();

    if (interfaceName.includes("Props")) {
      interfacesWithProps[interfaceName] = match[2].trim();
    }
  }

  return interfacesWithProps;
}

function searchComponentPropsInterface(
  result,
  interfacesWithProps,
  pascalName,
) {
  const interfaceSearchResult = Object.entries(interfacesWithProps).find(
    ([interfaceName]) => interfaceName.includes(pascalName),
  );

  const [currentInterfacePropsName = "", currentInterfacePropsContent = ""] =
    interfaceSearchResult ?? [];

  const extensions = currentInterfacePropsName
    .replace(/.*extends/, "")
    .trim()
    .split(",")
    .map((e) => e.trim());

  const interfacesContent = [
    "// Original props \n",
    currentInterfacePropsContent,
  ];

  extensions.forEach((extension) => {
    let extensionName = extension;
    let replacers = null;

    // If the extension has generics
    if (extension.includes("<")) {
      extensionName = extension.replace(/<.*>/g, "<T>");
      const generics = extension.match(/<.*>/g);
      replacers = generics && generics[0].replace(/</g, "").replace(/>/g, "");
    }

    let content = interfacesWithProps[extensionName];

    if (replacers) {
      content = content.replace(/T/g, replacers);
    }

    interfacesContent.push(`// Props from ${extensionName}\n`);
    interfacesContent.push(content);
  });

  return interfacesContent;
}

function addNewPropsInterfacesForComponent(
  result,
  interfacesContent,
  pascalName,
) {
  // Create the new props interface
  const newPropsInterface = ` ${pascalName}Props {${interfacesContent.join("\n")}}`;

  // Deprecate the old props interface
  return (
    result
      // Deprecate the old props interface
      .replace(
        `export interface ${pascalName}Props`,
        `interface __${pascalName}Props__`,
      )
      // Add the new props interface
      .replace(
        `interface __${pascalName}Props__`,
        `// This interface is auto generated to join the interfaces \nexport interface ${newPropsInterface}\n\ninterface __${pascalName}Props__`,
      )
  );
}

function mergeAllPropsInterfaceIntoNewInterface(result, pascalName) {
  const interfacesWithProps = getAllTheInterfacesFromPropsInComponent(
    result,
    pascalName,
  );
  const interfacesContent = searchComponentPropsInterface(
    result,
    interfacesWithProps,
    pascalName,
  );
  return addNewPropsInterfacesForComponent(
    result,
    interfacesContent,
    pascalName,
  );
}

function inlineTypes(fileData, name, pascalName) {
  const allTheNeededTypes = glob
    .sync([
      `src/models/**/*.model.ts`,
      `src/**/${name}.types.tsx`,
      `src/styles/themes.css.ts`,
      `src/styles/rainbow-sprinkles.css.ts`,
    ])
    .reverse()
    .map((src) => fs.readFileSync(src, "utf8"))
    .join("\n")
    // Remove type imports, should be injected
    .replace(/import type .*/g, "");

  // First try to fix the problem with watchers and names
  ////////////////////
  const watchRegex =
    /watch\(\s*\(\)\s*=>\s*\[(.*)\],\s*\(\[(.*)\]\s*\) ?=>\s*{([\s\S]*?)},\n/g;

  let match;
  let result = fileData;

  while ((match = watchRegex.exec(fileData)) !== null) {
    let callbackRegex = match[3].trim();
    let parametersRegex = match[2].trim();
    const parameters = parametersRegex.split(/\s*,\s*/);

    parameters.forEach((parameter) => {
      parametersRegex = parametersRegex.replace(
        new RegExp(parameter, "g"),
        `___${parameter}`,
      );
      callbackRegex = callbackRegex.replace(
        new RegExp(`props\\.${parameter}`, "g"),
        parameter,
      );
      callbackRegex = callbackRegex.replace(
        new RegExp(`${parameter}\\.value`, "g"),
        `${parameter}`,
      );
      callbackRegex = callbackRegex.replace(
        new RegExp(parameter, "g"),
        `___${parameter}`,
      );
    });

    result = result
      .replace(match[3], callbackRegex)
      .replace(
        new RegExp(`(watch.*)(\\s.*)?(\\s.*\\(\\[)(${match[2].trim()})(\\])`),
        `$1$2$3${parametersRegex}$5`,
      );
  }

  result = result
    // Inject needed types to this file as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
    .replace(
      /(<script setup)/g,
      `<script lang="ts">${allTheNeededTypes}</script>\n$1`,
    )
    // Type defineProps and Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
    .replace(
      /(const props = defineProps)\(\[(.|\n)*\]\);/gm,
      `$1<${pascalName}Props>();`,
    )
    // Enable children
    .replace(/this\.children/, "this.$slots.default()")
    // Add ? to .value variables
    // .replace(/\.value/g, '?.value')
    // Replace classname for class
    .replace(/\.className/g, ".class")
    //Fix using value in computed properties and classes
    // .replace(/classes\.(?!value)(.*`)/g, 'classes.value.$1')
    // remove ? from left hand assigments
    // .replace(/\?\.value =/g, '.value =')
    // Replace vue html .values for refs
    .replace(/\.value \}\}/g, "}}")
    // Enable Typescript
    .replace(/script setup/g, 'script setup lang="ts"')
    // TODO: Temporal meanwhile we find another why but this is stable
    .replace(/getData\(\);/g, "getData.bind(this)();");

  result = mergeAllPropsInterfaceIntoNewInterface(result, pascalName);

  return result;
}
