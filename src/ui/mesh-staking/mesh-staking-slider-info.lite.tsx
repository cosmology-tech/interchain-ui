import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { MeshStakingSliderInfoProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshStakingSliderInfo(
  props: MeshStakingSliderInfoProps,
) {
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
      gap="$8"
      alignItems="center"
      className={props.className}
    >
      <Box
        as="img"
        width="$12"
        height="$12"
        attributes={{
          src: props.tokenImgSrc,
          alt: props.tokenName,
        }}
      />

      <Stack direction="vertical" space="$1">
        <Text
          fontSize="$sm"
          color={state.theme === "dark" ? "$textPlaceholder" : "$text"}
          fontWeight="$medium"
        >
          {props.tokenName}
        </Text>

        <Text
          fontSize="$sm"
          fontWeight="$normal"
          color={props.isActive ? "$textSuccess" : "$textSecondary"}
        >
          {props.tokenAPR}
        </Text>
      </Stack>
    </Box>
  );
}
