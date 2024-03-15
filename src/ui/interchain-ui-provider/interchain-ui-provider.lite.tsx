import { useMetadata } from "@builder.io/mitosis";
import ThemeProvider from "../theme-provider";
import Toaster from "../toast/toaster.lite";
import type { InterchainUIProviderProps } from "./interchain-ui-provider.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function InterchainUIProvider(props: InterchainUIProviderProps) {
  return (
    <ThemeProvider {...props.themeOptions}>
      {props.children}
      <Toaster {...props.toastOptions} />
    </ThemeProvider>
  );
}
