import { useMetadata, Show } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import clx from "clsx";
import type { MeshFooterInfoItemProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshFooterInfoItem(props: MeshFooterInfoItemProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$2"
      justifyContent="flex-start"
      alignItems="center"
      className={clx(props.className)}
    >
      <Text fontSize="$3xl" color="$text" fontWeight="$medium">
        {props.title}
      </Text>

      <Text fontSize="$sm" color="$textSecondary">
        {props.description}
      </Text>

      <Show when={props.subDescription}>
        <Text
          fontSize="$xs"
          color="$textSuccess"
          {...props.subDescriptionProps}
        >
          {props.subDescription}
        </Text>
      </Show>
    </Box>
  );
}
