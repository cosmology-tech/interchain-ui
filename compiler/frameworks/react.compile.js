// @ts-check
const compiler = require("../base");

const DEFAULT_OPTIONS = {
  target: "react",
  extension: "tsx",
  state: "useState",
  styles: "style-tag",
};

(async () => {
  await compiler.compile(DEFAULT_OPTIONS);
})();
