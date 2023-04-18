import { setPlatform, Platform } from "./helpers";
export { setDebugLevel, DebugLevel } from "./helpers";
export { store } from "./models/store";

export { default as Button } from "./ui/button/button.vue";
export { default as ThemeProvider } from "./ui/theme-provider/theme-provider.vue";
export { default as WalletConnectModal } from "./ui/wallet-connect-modal/wallet-connect-modal.vue";
export { default as FadeIn } from "./ui/fade-in/fade-in.vue";

setPlatform(Platform.Vue);
