import { onMount, onUnMount, useStore, useRef } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import { installButtonStyles } from "./connect-modal-install-button.css";
import type { ConnectModalInstallButtonProps } from "./connect-modal-install-button.types";

export default function ConnectModalInstallButton(
  props: ConnectModalInstallButtonProps
) {
  const state = useStore({
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
      as="button"
      {...props.attributes}
      className={clx(installButtonStyles[state.theme], props.className)}
      attributes={{
        onClick: (event) => props.onClick?.(event),
        onMouseEnter: (event) => props.onHoverStart?.(event),
        onMouseLeave: (event) => props.onHoverEnd?.(event),
        disabled: props.disabled,
        ...props.domAttributes,
      }}
    >
      {props.children}
    </Box>
  );
}
