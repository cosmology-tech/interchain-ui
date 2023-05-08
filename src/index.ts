import { setPlatform, Platform } from "./helpers";

export { setDebugLevel, createCustomTheme, DebugLevel } from "./helpers";
export { store } from "./models/store";

export type { UIStore, UIState, UIAction } from "./models/store";

export { default as Box } from "./ui/box";
export { default as Icon } from "./ui/icon";
export { default as Text } from "./ui/text";
export { default as Button } from "./ui/button";
export { default as ThemeProvider } from "./ui/theme-provider";
export { default as FadeIn } from "./ui/fade-in";

setPlatform(Platform.Default);
