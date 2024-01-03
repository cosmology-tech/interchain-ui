import { useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import { meshThemeClass } from "../../styles/themes.css";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import type { MeshStakingSliderInfoProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshStakingSliderInfo(
  props: MeshStakingSliderInfoProps
) {
  return (
    <Box
      display="flex"
      gap="$8"
      alignItems="center"
      className={clx(meshThemeClass, props.className)}
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
        <Text fontSize="$sm" color="$textPlaceholder" fontWeight="$medium">
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
