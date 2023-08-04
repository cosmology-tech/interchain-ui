const fs = require("fs/promises");
const fsSync = require("fs");
const crypto = require("crypto");

function replacer(key, value) {
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
  constructor() {
    // { <filePath>: <contentHash> }
    this.cache = new Map();
    this.isPopulated = false;
  }

  async build(filePaths = []) {
    const promises = [];

    const putCache = async (filePath) => {
      try {
        const fileContent = await fs.readFile(filePath, "utf8");
        const hash = this.hash(fileContent);
        this.cache.set(filePath, hash);
      } catch (err) {
        console.error("Cannot build cache, error reading file ", filePath);
        throw err;
      }
    };

    for (const filePath of filePaths) {
      const fileExists = fsSync.existsSync(filePath);
      if (!fileExists) continue;

      promises.push(putCache(filePath));
    }

    try {
      await Promise.all(promises);
      this.isPopulated = true;
    } catch (err) {
      console.error("Cannot build cache ", err);
    }
  }

  toString() {
    return JSON.stringify(this.cache, replacer);
  }

  hash(source) {
    return crypto.createHash("sha1").update(source).digest("base64");
  }

  has(filePath) {
    return this.cache.has(filePath);
  }

  get(filePath) {
    return this.cache.get(filePath);
  }

  set(filePath, source) {
    const hash = this.hash(source);
    this.cache.set(filePath, hash);
  }

  // Check if file content changed
  async isChanged(filePath) {
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

module.exports = {
  Cache,
};
