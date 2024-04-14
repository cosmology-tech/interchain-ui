import { useMetadata } from "@builder.io/mitosis";
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
  props: MeshStakingSliderInfoProps,
) {
  return (
    <Box
      display="flex"
      gap="$8"
      flexShrink={0}
      maxWidth="$23"
      alignItems="center"
      attributes={props.attributes}
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
          color="$meshStakingSliderInfoPrimaryText"
          fontWeight="$medium"
        >
          {props.tokenName}
        </Text>

        <Text
          fontSize="$sm"
          fontWeight="$normal"
          color={
            props.isActive
              ? "$meshStakingSliderInfoSecondaryTextActive"
              : "$meshStakingSliderInfoSecondaryText"
          }
        >
          {props.tokenAPR}
        </Text>
      </Stack>
    </Box>
  );
}
