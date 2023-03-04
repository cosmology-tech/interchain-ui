const fs = require("fs-extra");
const glob = require("glob");
const mainPackageJson = require("../package.json");
const dependencies = mainPackageJson.dependencies;
const allFrameworkPkgJsons = glob.sync(`./packages/**/package.json`);

function copyMainDependencies(packageJson) {
  const data = fs.readFileSync(packageJson, "utf8");
  const rawDependencies = Object.entries(dependencies)
    .map(([key, value]) => `\n    "${key}": "${value}"`)
    .join(",");
  const result = data.replace(
    /("dependencies": {)(.*)(  },\r?\n?  "peerDependencies)/gs,
    `$1${rawDependencies}\n$3`
  );

  fs.writeFileSync(packageJson, result, "utf8");
}

function copyThemes(packageJson) {
  const data = fs.readFileSync(packageJson, "utf8");
  const rawDependencies = Object.entries(dependencies)
    .map(([key, value]) => `\n    "${key}": "${value}"`)
    .join(",");
  const result = data.replace(
    /("dependencies": {)(.*)(  },\r?\n?  "peerDependencies)/gs,
    `$1${rawDependencies}\n$3`
  );

  fs.writeFileSync(packageJson, result, "utf8");
}

allFrameworkPkgJsons.forEach((packageJson) => {
  copyMainDependencies(packageJson);
  copyThemes(packageJson);
});
