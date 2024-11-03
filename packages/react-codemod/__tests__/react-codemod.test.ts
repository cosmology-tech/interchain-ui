import { it, expect, describe } from "vitest";
import { reactCodemod } from "../src/react-codemod";
import * as fs from "fs";
import * as path from "path";
import { formatCode } from "../src/test-utils";

function getFixturePaths(fixtureDir: string): string[] {
  const fixtures: string[] = [];
  let i = 1;

  while (true) {
    const fixturePath = path.join(fixtureDir, `input-${i}`);
    if (!fs.existsSync(fixturePath)) break;
    fixtures.push(fixturePath);
    i++;
  }

  return fixtures;
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

describe("react-codemod", () => {
  const fixtureDir = path.join(__dirname, "..", "__fixtures__");
  const fixturePaths = getFixturePaths(fixtureDir);

  fixturePaths.forEach((fixturePath) => {
    const fixtureNumber = path.basename(fixturePath).split("-")[1];

    it(`should transform input-${fixtureNumber} correctly`, async () => {
      const input = readFile(path.join(fixturePath, "input.tsx"));
      const expectedOutput = readFile(path.join(fixturePath, "output.tsx"));

      const result = reactCodemod(input);

      const formattedResult = await formatCode(result);
      const formattedExpected = await formatCode(expectedOutput);

      console.log("formattedResult", formattedResult);
      console.log("formattedExpected", formattedExpected);
      expect(formattedResult).toBe(formattedExpected);
    });
  });
});
