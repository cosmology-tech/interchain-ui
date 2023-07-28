import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import Box from "../box";
import { qrcodeSkeleton } from "./connect-modal-qrcode-skeleton.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";

export default function ConnectModalQrCodeSkeleton(props) {
  const state = useStore<{ theme: ThemeVariant }>({
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
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width="$full"
      px="$6"
      className={props.className}
    >
      <div className={qrcodeSkeleton[state.theme]} />
    </Box>
  );
}
