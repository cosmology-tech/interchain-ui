import { setPlatform, Platform } from "./helpers";

export { setDebugLevel, createCustomTheme, DebugLevel } from "./helpers";
export { store } from "./models/store";

export type { UIStore, UIState, UIAction } from "./models/store";

// Init Components
export { default as Box } from "./ui/box";
export { default as Stack } from "./ui/stack";
export { default as Icon } from "./ui/icon";
export { default as Text } from "./ui/text";
export { default as Button } from "./ui/button";
export { default as ClipboardCopyText } from "./ui/clipboard-copy-text";
export { default as ThemeProvider } from "./ui/theme-provider";
export { default as FadeIn } from "./ui/fade-in";
export { default as PoolsHeader } from "./ui/pools-header";
export { default as PoolList } from "./ui/pool-list";
export { default as PoolListItem } from "./ui/pool-list-item";
export { default as ConnectModalWalletButton } from "./ui/connect-modal-wallet-button";
export { default as ConnectModal } from "./ui/connect-modal";
export { default as ConnectModalStatus } from "./ui/connect-modal-status";
// End Components

setPlatform(Platform.Default);
