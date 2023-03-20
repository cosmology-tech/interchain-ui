import { setPlatform, Platform } from "./helpers";
export { setDebugLevel, DebugLevel } from "./helpers";
export { store } from "./models/store";

export { default as Button } from "./ui/button";
export { default as Modal } from "./ui/modal";
export { default as ThemeProvider } from "./ui/theme-provider";

setPlatform(Platform.Default);
