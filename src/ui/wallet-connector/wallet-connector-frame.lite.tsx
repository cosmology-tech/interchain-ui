import { useStore, useRef, onMount, onUnMount } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import * as styles from "./wallet-connector.css";

import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { WalletConnectorFrameProps } from "./wallet-connector.types";

export default function WalletConnectorFrame(props: WalletConnectorFrameProps) {
  const state = useStore<{
    theme: ThemeVariant;
  }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      {...props.attributes}
      bg="$cardBg"
      className={clx(
        props.className,
        "wallet-connector-frame",
        styles.walletConnectorFrame[state.theme],
      )}
    >
      {props.children}
    </Box>
  );
}
