const clc = require("cli-color");

const error = clc.red.bold;
const warn = clc.yellow;
const info = clc.blue;

module.exports = {
  error: (...args) => console.log(error(...args)),
  warn: (...args) => console.log(warn(...args)),
  info: (...args) => console.log(info(...args)),
};
