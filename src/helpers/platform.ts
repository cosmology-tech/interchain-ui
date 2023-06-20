import { debug } from "./debug";

export enum Platform {
  Default = "default",
  Angular = "angular",
  Preact = "preact",
  Qwik = "qwik",
  React = "react",
  Solid = "solid",
  Svelte = "svelte",
  Vue = "vue",
  Webcomponents = "webcomponent",
}

let platform = Platform.Default;

export function setPlatform(newPlatform: Platform) {
  debug(`Setting new platform ${newPlatform}`);

  platform = newPlatform;
}

export function getPlatform(): Platform {
  return platform;
}

export function isSSR() {
  return typeof window === "undefined";
}
