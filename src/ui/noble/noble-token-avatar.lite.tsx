import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";

import Box from "../box";
import { store } from "../../models/store";
import type { NobleTokenAvatarProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleTokenAvatar(props: NobleTokenAvatarProps) {
  const state = useStore({
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
      width="$15"
      height="$15"
      attributes={{
        "data-part-id": "noble-token-avatar",
      }}
    >
      <Box
        as="img"
        width="$15"
        height="$15"
        attributes={{
          src: props.mainLogoUrl,
          alt: props.mainLogoAlt ?? "Token logo",
        }}
      />

      <Box
        as="img"
        width="$9"
        height="$9"
        position="absolute"
        bottom="-4px"
        right="-2px"
        borderRadius="$full"
        borderWidth="2px"
        borderStyle="solid"
        borderColor="$cardBg"
        bg="$cardBg"
        attributes={{
          src: props.subLogoUrl,
          alt: props.subLogoAlt ?? "Token logo",
        }}
      />
    </Box>
  );
}
