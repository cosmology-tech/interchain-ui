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

(async () => {
  function customReplace(props) {
    const { name, pascalName, outFile, outPath, isFirstCompilation } = props;

    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

      // .vue extension already added, don't process
      // TODO: add a map to check for duplicated work
      // if (data.indexOf(".vue") !== -1) return data;

      console.log("Before", data);
      const result = data
        // Add .vue to index
        .replace(/(export)(.*)\/ui\/(.+)";/g, `$1$2/ui/$3/$3.vue";`)
        .replace(/(extensions)\/(.*)\.vue/g, "$1/$2")
        .replace(/\/helpers\.vue/g, "");

      console.log("After", result);

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

    const allTheNeededTypes = glob
      .sync([`src/models/**/*.model.ts`, `src/**/${name}.model.ts`])
      .reverse()
      .map((src) => fs.readFileSync(src, "utf8"))
      .join("\n")
      // Remove type imports, should be injected
      .replace(/import type .*/g, "");

    // First try to fix the problem with watchers and names
    const watchRegex =
      /watch\(\s*\(\)\s*=>\s*\[(.*)\],\s*\(\[(.*)\]\s*\) ?=>\s*{([\s\S]*?)},\n/g;

    let match;
    let result = data;
    while ((match = watchRegex.exec(data)) !== null) {
      let callbackRegex = match[3].trim();
      let parametersRegex = match[2].trim();
      const parameters = parametersRegex.split(/\s*,\s*/);

      parameters.forEach((parameter) => {
        parametersRegex = parametersRegex.replace(
          new RegExp(parameter, "g"),
          `___${parameter}`
        );
        callbackRegex = callbackRegex.replace(
          new RegExp(`props\\.${parameter}`, "g"),
          parameter
        );
        callbackRegex = callbackRegex.replace(
          new RegExp(`${parameter}\\.value`, "g"),
          `${parameter}`
        );
        callbackRegex = callbackRegex.replace(
          new RegExp(parameter, "g"),
          `___${parameter}`
        );
      });

      result = result
        .replace(match[3], callbackRegex)
        .replace(
          new RegExp(`(watch.*)(\\s.*)?(\\s.*\\(\\[)(${match[2].trim()})(\\])`),
          `$1$2$3${parametersRegex}$5`
        );
    }

    result = result
      // Inject needed types to this file as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(
        /(<script setup)/g,
        `<script lang="ts">${allTheNeededTypes}</script>\n$1`
      )
      // Type defineProps and Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(
        /(const props = defineProps)\(\[(.|\n)*\]\);/gm,
        `$1<${pascalName}Props>();`
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

    fs.writeFileSync(outFile, result, "utf8");
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
