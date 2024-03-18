import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  useDefaultProps,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { MeshTabProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshTabProps>>({
  isActive: false,
});

export default function MeshTab(props: MeshTabProps) {
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
      position="relative"
      attributes={{
        "data-testid": "mesh-tab-container",
      }}
    >
      <Box
        as="button"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="transparent"
        color={state.theme === "dark" ? "$textPlaceholder" : "$text"}
        fontSize="$sm"
        fontWeight="$medium"
        py="$8"
        px="$3"
        borderRadius="$md"
        filter={props.isActive ? undefined : "grayscale(60%) opacity(40%)"}
        {...props}
        {...props.attributes}
        className={clx(baseButton, props.className)}
        attributes={{
          ...props.domAttributes,
          onClick: (event) => props.onClick?.(event),
        }}
      >
        {props.children}
      </Box>

      <Box
        height="1px"
        width="100%"
        bg="$textSuccess"
        bottom="$0"
        opacity={props.isActive ? 1 : 0}
        transition="250ms opacity"
      />
    </Box>
  );
}
