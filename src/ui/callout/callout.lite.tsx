import {
  Show,
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
  useDefaultProps,
} from "@builder.io/mitosis";

import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import { getIntentColors } from "./callout.helpers";
import type { CalloutProps } from "./callout.types";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<CalloutProps>>({
  intent: "none",
});

export default function Callout(props: CalloutProps) {
  const state = useStore<{
    theme: ThemeVariant;
    colorsProperties: {
      color: Sprinkles["color"];
      bg: Sprinkles["bg"];
    };
    isValidIconName: () => boolean;
  }>({
    theme: "light",
    get colorsProperties() {
      return getIntentColors(props.intent, state.theme as ThemeVariant);
    },
    isValidIconName() {
      return ALL_ICON_NAMES.includes(props.iconName);
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      className={props.className}
      borderRadius="$md"
      p="$6"
      {...state.colorsProperties}
      {...props.attributes}
    >
      <Box display="flex" gap="$6" flexDirection="column">
        <Box display="flex" flexWrap="nowrap" gap="$5">
          <Show when={!!props.iconName && state.isValidIconName()}>
            <Icon name={props.iconName} size="$3xl" color="inherit" />
          </Show>

          <Show
            when={
              !props.iconName && !state.isValidIconName() && props.iconRender
            }
          >
            {props.iconRender}
          </Show>

          <Text as="h5" fontSize="$md" fontWeight="$semibold" color="inherit">
            {props.title}
          </Text>
        </Box>

        <Text as="div" fontSize="$sm" fontWeight="$normal" color="inherit">
          {props.children}
        </Text>
      </Box>
    </Box>
  );
}
