import {
  useMetadata,
  useStore,
  useDefaultProps,
  useRef,
  Show,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import Stack from "../stack";
import { baseButton } from "../button/button.css";

import type { MeshTableHeaderActionProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshTableHeaderActionProps>>({
  type: "stake",
  stakeLabel: "Stake",
  unstakeLabel: "Unstake",
});

export default function MeshTableHeaderAction(
  props: MeshTableHeaderActionProps,
) {
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
    <Box display="flex" gap="$7" flexWrap="wrap" attributes={props.attributes}>
      <Box
        as="button"
        className={baseButton}
        backgroundColor="transparent"
        flexShrink={0}
        attributes={{
          onClick: () => props.onClick?.(),
        }}
      >
        <Show when={props.type === "stake"}>
          <Text
            color="$textSuccess"
            fontSize="$md"
            fontWeight="$normal"
            attributes={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "$4",
            }}
          >
            <Icon name="plusRound" color="inherit" />
            {props.stakeLabel}
          </Text>
        </Show>

        <Show when={props.type === "unstake"}>
          <Text
            color="$textDanger"
            fontSize="$md"
            fontWeight="$normal"
            attributes={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "$4",
            }}
          >
            <Icon name="minusRound" color="inherit" />
            {props.unstakeLabel}
          </Text>
        </Show>
      </Box>

      <Stack
        direction="horizontal"
        space="$4"
        attributes={{
          alignItems: "center",
        }}
      >
        <Box
          as="img"
          width="$10"
          height="$10"
          attributes={{
            src: props.tokenImgSrc,
            alt: props.tokenName,
          }}
        />

        <Text
          fontSize="$md"
          fontWeight="$medium"
          color={state.theme === "dark" ? "$white" : "$text"}
        >
          {props.tokenAmount}
        </Text>

        <Text
          fontSize="$sm"
          fontWeight="$light"
          color={state.theme === "dark" ? "$textPlaceholder" : "$textSecondary"}
        >
          {props.tokenName}
        </Text>
      </Stack>
    </Box>
  );
}
