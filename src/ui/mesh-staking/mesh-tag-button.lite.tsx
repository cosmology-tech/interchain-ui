import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import {
  meshDarkThemeClass,
  meshLightThemeClass,
} from "../../styles/themes.css";
import type { MeshTagButtonProps } from "./mesh-staking.types";

import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTagButton(props: MeshTagButtonProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<(() => void) | null>(null);

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
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={
        state.theme === "dark"
          ? {
              base: "$gray600",
              hover: "$gray500",
            }
          : {
              base: "$menuItemBgSelected",
              hover: "$menuItemBgHovered",
            }
      }
      color={state.theme === "dark" ? "$text" : "$accentText"}
      fontSize="$sm"
      py="$2"
      px="$6"
      borderRadius="$md"
      height="$11"
      {...props}
      {...props.attributes}
      className={clx(
        {
          [meshLightThemeClass]: state.theme === "light",
          [meshDarkThemeClass]: state.theme === "dark",
        },
        baseButton,
        props.className
      )}
      attributes={{
        ...props.domAttributes,
        onClick: (event) => props.onClick?.(event),
      }}
    >
      {props.children}
    </Box>
  );
}
