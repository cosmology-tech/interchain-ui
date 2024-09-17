import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import Box from "../box";
import { qrcodeSkeleton } from "./connect-modal-qrcode-skeleton.css";
import { store } from "../../models/store";
import { connectModalQRCodeSkeletonOverrides } from "./connect-modal-qrcode-skeleton.helper";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalQrCodeSkeleton(props) {
  const state = useStore<{
    internalTheme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
  }>({
    internalTheme: "light",
    overrideManager: null,
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.internalTheme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.internalTheme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
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
      <div
        className={qrcodeSkeleton[state.internalTheme]}
        style={state.overrideManager?.applyOverrides(
          connectModalQRCodeSkeletonOverrides.name,
        )}
      />
    </Box>
  );
}
