import clc from "cli-color";

const error = clc.red.bold;
const warn = clc.yellow;
const info = clc.blue;

interface LogFunction {
  (...args: unknown[]): void;
}

const log: {
  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
} = {
  error: (...args: unknown[]) => console.log(error(...args)),
  warn: (...args: unknown[]) => console.log(warn(...args)),
  info: (...args: unknown[]) => console.log(info(...args)),
};

export default log;
