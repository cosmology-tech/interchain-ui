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
import type { NobleSelectTokenButtonProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleSelectTokenButton(
  props: NobleSelectTokenButtonProps,
) {
  const state = useStore({
    theme: "light",
    get buttonProps() {
      const { size, ...otherProps } = props;
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
      borderless={props.borderless}
      isActive={props.isActive}
      size="xl"
    >
      <Box display="flex" gap="$8" flex="1">
        <NobleTokenAvatar {...props.token} />

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          flex="1"
          alignItems="flex-start"
        >
          <Box display="flex" justifyContent="space-between" width="$full">
            <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
              {props.token.symbol}
            </Text>
            <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
              {props.token.tokenAmount}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between" width="$full">
            <Text
              as="span"
              color="$textSecondary"
              fontSize="$sm"
              fontWeight="$normal"
            >
              {props.token.network}
            </Text>
            <Text
              as="span"
              color="$textSecondary"
              fontSize="$sm"
              fontWeight="$normal"
            >
              {props.token.notionalValue}
            </Text>
          </Box>
        </Box>
      </Box>
    </NobleButton>
  );
}
