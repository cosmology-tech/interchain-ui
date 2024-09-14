import fs from "fs-extra";
import { Event } from "@parcel/watcher";
import * as compiler from "../base";
import { fixReactTypeIssues } from "../utils/react.utils";
import log from "../log";
import type { CustomReplaceProps } from "../base";

const DEFAULT_OPTIONS = {
  target: "react",
  extension: "tsx",
  state: "useState",
  styles: "style-tag",
};

function customReplaceReact(props: CustomReplaceProps): void {
  const { name, pascalName, outFile } = props;
  log.info(`\nCompiling ${name} [${pascalName}] for React...`);

  const data = fs.readFileSync(outFile, "utf8");

  const result = fixReactTypeIssues(data);

  fs.writeFileSync(outFile, result, "utf8");
}

async function compileReact(watcherEvents?: Event[]): Promise<void> {
  await compiler.compile({
    ...DEFAULT_OPTIONS,
    watcherEvents: watcherEvents as Event[],
    customReplace: customReplaceReact,
  });
}

export { compileReact };

if (require.main === module) {
  // Call directly through CLI
  (async () => {
    await compileReact();
  })();
}
