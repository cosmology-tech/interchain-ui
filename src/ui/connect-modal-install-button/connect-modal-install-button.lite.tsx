import {
  onMount,
  onUnMount,
  useMetadata,
  useRef,
  useStore,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import Box from "../box";
import {
  fluidWidth,
  installButtonStyles,
} from "./connect-modal-install-button.css";
import { installButtonOverrides } from "./connect-modal-install-button.helper";
import type { ConnectModalInstallButtonProps } from "./connect-modal-install-button.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalInstallButton(
  props: ConnectModalInstallButtonProps
) {
  const state = useStore({
    theme: "light",
    overrideManager: null,
    getClassName: () => {
      return clx(
        installButtonStyles[state.theme],
        props.fluidWidth ? fluidWidth : "",
        props.className
      );
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      as="button"
      {...props.attributes}
      className={state.getClassName()}
      rawCSS={state.overrideManager?.applyOverrides(
        installButtonOverrides.name
      )}
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
