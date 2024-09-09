import type { CodemodPlugin } from "vue-metamorph";

export const helloWorldCodeMod: CodemodPlugin = {
  type: "codemod",
  name: "change string literals to hello, world",

  transform({
    scriptASTs,
    sfcAST,
    styleASTs,
    filename,
    utils: { traverseScriptAST, traverseTemplateAST },
  }) {
    // codemod plugins self-report the number of transforms it made
    // this is only used to print the stats in CLI output
    let transformCount = 0;

    // scriptASTs is an array of Program ASTs
    // in a js/ts file, this array will only have one item
    // in a vue file, this array will have one item for each <script> block
    for (const scriptAST of scriptASTs) {
      // traverseScriptAST is an alias for the ast-types 'visit' function
      // see: https://github.com/benjamn/ast-types#ast-traversal
      traverseScriptAST(scriptAST, {
        visitLiteral(path) {
          if (typeof path.node.value === "string") {
            // mutate the node
            path.node.value = "Hello, world!";
            console.log("Found", path.node.value);
            transformCount++;
          }

          return this.traverse(path);
        },
      });
    }

    if (sfcAST) {
      // traverseTemplateAST is an alias for the vue-eslint-parser 'AST.traverseNodes' function
      // see: https://github.com/vuejs/vue-eslint-parser/blob/master/src/ast/traverse.ts#L118
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          // console.log("node", node);

          if (node.type === "VText" && typeof node.value === "string") {
            if (node.value.trim() === "") return;

            // mutate the node
            node.value = "Hello, world!";
            transformCount++;
          }
        },
        leaveNode() {},
      });
    }
    return transformCount;
  },
};
