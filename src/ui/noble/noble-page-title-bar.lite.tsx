import {
  Show,
  useRef,
  useStore,
  useMetadata,
  useDefaultProps,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import { store } from "../../models/store";
import { NoblePageTitleBarProps } from "./noble.types";
import NobleButton from "./noble-button.lite";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NoblePageTitleBarProps>>({
  showBackButton: true,
});

export default function NoblePageTitleBar(props: NoblePageTitleBarProps) {
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
      display="flex"
      alignItems="center"
      gap="$8"
      mb={props.mb}
      mt={props.mt}
      mx={props.mx}
    >
      <Show when={props.showBackButton}>
        <NobleButton
          variant="text"
          leftIcon="arrowRightRounded"
          onClick={(event) => props.onBackButtonClick?.(event)}
          iconSize="$sm"
          color={state.theme === "light" ? "$gray500" : "$gray600"}
          attributes={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: state.theme === "light" ? "$gray700" : "$blue300",
            borderRadius: "$base",
            bg: state.theme === "light" ? "$white" : "$blue200",
            width: "$12",
            height: "$12",
            transform: "rotate(180deg)",
          }}
        />
      </Show>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        lineHeight="1.4"
      >
        {props.title}
      </Text>
    </Box>
  );
}
