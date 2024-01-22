import { useMetadata, For } from "@builder.io/mitosis";
import Box from "../box";
import type { MeshTableValidatorsCellProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTableValidatorsCell(
  props: MeshTableValidatorsCellProps
) {
  return (
    <Box display="flex" position="relative">
      <For each={props.validators}>
        {(validator, index) => (
          <Box
            as="span"
            key={validator.name + index}
            display="inline-block"
            overflow="hidden"
            width="24px"
            borderRadius="$full"
            backgroundColor="$white"
            borderColor="$black"
            borderWidth="1px"
            borderStyle="solid"
            marginLeft={index === 0 ? undefined : "-8px"}
          >
            <Box
              as="img"
              width="24px"
              height="24px"
              borderRadius="$full"
              attributes={{
                src: `${validator.imgSrc}`,
                alt: `validator-thumbnail-${index}`,
              }}
            />
          </Box>
        )}
      </For>
    </Box>
  );
}
