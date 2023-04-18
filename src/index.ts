import { setPlatform, Platform } from "./helpers";
export { setDebugLevel, DebugLevel } from "./helpers";
export { store } from "./models/store";

export { default as Button } from "./ui/button";
export { default as ThemeProvider } from "./ui/theme-provider";
export { default as WalletConnectModal } from "./ui/wallet-connect-modal";
export { default as FadeIn } from "./ui/fade-in";

setPlatform(Platform.Default);
