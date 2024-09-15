import fs from "fs/promises";
import fsSync from "fs";
import crypto from "crypto";

function replacer(_key: string, value: unknown): unknown {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

class Cache {
  private cache: Map<string, string>;
  public isPopulated: boolean;

  constructor() {
    // { <filePath>: <contentHash> }
    this.cache = new Map();
    this.isPopulated = false;
  }

  async build(filePaths: string[] | undefined = []): Promise<void> {
    if (!filePaths) {
      return;
    }

    const promises = filePaths
      .filter((filePath) => fsSync.existsSync(filePath))
      .map(async (filePath) => {
        try {
          const fileContent = await fs.readFile(filePath, "utf8");
          const hash = this.hash(fileContent);
          // Check if the file still exists and its content hasn't changed
          // before setting the cache to avoid race conditions
          const currentContent = await fs.readFile(filePath, "utf8");
          if (currentContent === fileContent) {
            this.cache.set(filePath, hash);
          }
        } catch (err) {
          console.error("Cannot build cache, error reading file ", filePath);
          // Don't throw here, allow other files to be processed
        }
      });

    try {
      await Promise.all(promises);
      this.isPopulated = true;
    } catch (err) {
      console.error("Cannot build cache ", err);
    }
  }

  toString(): string {
    return JSON.stringify(this.cache, replacer);
  }

  private hash(source: string): string {
    return crypto.createHash("sha1").update(source).digest("base64");
  }

  has(filePath: string): boolean {
    return this.cache.has(filePath);
  }

  get(filePath: string): string | undefined {
    return this.cache.get(filePath);
  }

  set(filePath: string, source: string): void {
    const hash = this.hash(source);
    this.cache.set(filePath, hash);
  }

  // Check if file content changed
  async isChanged(filePath: string): Promise<boolean> {
    if (!this.cache.has(filePath)) {
      return true;
    }

    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      const currentHash = this.hash(fileContent);
      const prevHash = this.cache.get(filePath);
      return prevHash !== currentHash;
    } catch (err) {
      console.error("isDiff error ", err);
      return true;
    }
  }
}

export { Cache };
