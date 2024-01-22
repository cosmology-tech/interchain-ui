import { useMetadata, useDefaultProps, Show } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import type { MeshTableChainCellProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshTableChainCellProps>>({
  size: "md",
});

export default function MeshTableChainCell(props: MeshTableChainCellProps) {
  return (
    <Show
      when={props.size === "sm"}
      else={
        <Stack
          direction="horizontal"
          space="$8"
          attributes={{
            alignItems: "center",
            minWidth: "$28",
          }}
        >
          <Box
            as="img"
            width="$14"
            height="$14"
            attributes={{
              src: props.imgSrc,
              alt: props.name,
            }}
          />

          <Text fontWeight="$medium" color="$textPlaceholder">
            {props.name}
          </Text>
        </Stack>
      }
    >
      <Stack
        direction="horizontal"
        space="$8"
        attributes={{
          alignItems: "center",
          minWidth: "$28",
        }}
      >
        <Box
          as="img"
          width="$12"
          height="$12"
          attributes={{
            src: props.imgSrc,
            alt: props.name,
          }}
        />

        <Text fontWeight="$medium" color="$textPlaceholder">
          {props.name}
        </Text>
      </Stack>
    </Show>
  );
}
