import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import NobleButton from "./noble-button.lite";
import NobleTokenAvatar from "./noble-token-avatar.lite";
import { store } from "../../models/store";
import type { NobleSelectNetworkButtonProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleSelectNetworkButton(
  props: NobleSelectNetworkButtonProps,
) {
  const state = useStore({
    theme: "light",
    get buttonProps() {
      const { size, title, subTitle, actionLabel, logoUrl, ...otherProps } =
        props;
      return otherProps;
    },
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
    <NobleButton
      {...state.buttonProps}
      variant="outlined"
      size={props.size ?? "xl"}
    >
      <Box display="flex" gap="$7" flex="1" alignItems="center" px="$4" py="$4">
        <Box
          as="img"
          width="26px"
          height="26px"
          attributes={{
            src: props.logoUrl,
            alt: props.title,
          }}
        />

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text color="$text" fontWeight="$semibold" fontSize="$sm">
            {props.title}
          </Text>
          <Text color="$textSecondary" fontWeight="$normal" fontSize="$2xs">
            {props.subTitle}
          </Text>
        </Box>

        <Box flex={1} textAlign="right">
          <Text color="$inputBorderFocus" fontWeight="$medium" fontSize="$xs">
            {props.actionLabel}
          </Text>
        </Box>
      </Box>
    </NobleButton>
  );
}
