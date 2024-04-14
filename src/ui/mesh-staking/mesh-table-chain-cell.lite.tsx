import { useMetadata, Show, useDefaultProps } from "@builder.io/mitosis";

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
    <>
      <Show when={props.size === "xs"}>
        <Stack
          direction="horizontal"
          space="$8"
          attributes={{
            alignItems: "center",
            minWidth: "$28",
            ...props.attributes,
          }}
        >
          <Box
            as="img"
            width="$10"
            height="$10"
            attributes={{
              src: props.imgSrc,
              alt: props.name,
            }}
          />

          <Text fontSize="$sm" fontWeight="$medium" color="$meshTableCellText">
            {props.name}
          </Text>
        </Stack>
      </Show>

      <Show when={props.size === "sm"}>
        <Stack
          direction="horizontal"
          space="$8"
          attributes={{
            alignItems: "center",
            minWidth: "$28",
            ...props.attributes,
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

          <Text fontWeight="$medium" color="$meshTableCellText">
            {props.name}
          </Text>
        </Stack>
      </Show>

      <Show when={props.size === "md"}>
        <Stack
          direction="horizontal"
          space="$8"
          attributes={{
            alignItems: "center",
            minWidth: "$28",
            ...props.attributes,
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

          <Text fontWeight="$medium" color="$meshTableCellText">
            {props.name}
          </Text>
        </Stack>
      </Show>
    </>
  );
}
