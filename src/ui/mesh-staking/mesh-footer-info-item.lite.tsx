import {
  useMetadata,
  useStore,
  useRef,
  Show,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import clx from "clsx";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { MeshFooterInfoItemProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshFooterInfoItem(props: MeshFooterInfoItemProps) {
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
      display="flex"
      flexDirection="column"
      gap="$2"
      justifyContent="flex-start"
      alignItems="center"
      className={clx(props.className)}
    >
      <Text fontSize="$3xl" color="$text" fontWeight="$medium">
        {props.title}
      </Text>

      <Text fontSize="$sm" color="$textSecondary">
        {props.description}
      </Text>

      <Show when={props.subDescription}>
        <Text fontSize="$xs" color="$textSuccess">
          {props.subDescription}
        </Text>
      </Show>
    </Box>
  );
}
