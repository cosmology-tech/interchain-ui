import { compileFiles, vuePlugin } from "../src";
import fs from "fs-extra";
import path from "path";

jest.mock("fs-extra");
jest.mock("glob");

describe("compiler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should compile files", () => {
    const mockFiles = ["file1.tsx", "file2.tsx"];
    require("glob").sync.mockReturnValue(mockFiles);

    const mockContent = `
      export default function Component() {
        return <div>Hello</div>;
      }
    `;
    (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

    compileFiles("**/*.tsx", "output", [vuePlugin]);

    expect(fs.outputFileSync).toHaveBeenCalledTimes(mockFiles.length);
    expect(fs.outputFileSync).toHaveBeenCalledWith(
      expect.stringContaining("output"),
      expect.stringContaining("Hello"),
    );
  });
});
