import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
  Show,
  useDefaultProps,
} from "@builder.io/mitosis";

import Box from "../box";
import { store } from "../../models/store";
import type { NobleTokenAvatarProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NobleTokenAvatarProps>>({
  isRound: true,
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
        borderRadius={props.isRound ? "$full" : undefined}
        attributes={{
          src: props.mainLogoUrl,
          alt: props.mainLogoAlt ?? "Token logo",
        }}
      />

      <Show
        when={props.isLoadingSubLogo}
        else={
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
        }
      >
        <Box
          width="$9"
          height="$9"
          position="absolute"
          bottom="-4px"
          right="-2px"
          borderRadius="$full"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="$cardBg"
          bg={state.theme === "light" ? "$gray800" : "$blue500"}
        />
      </Show>
    </Box>
  );
}
