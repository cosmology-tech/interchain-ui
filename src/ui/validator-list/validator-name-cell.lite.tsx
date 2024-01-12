import { useMetadata, Show, useDefaultProps } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import type { ValidatorNameCellProps } from "./validator-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ValidatorNameCellProps>>({
  size: "md",
});

export default function ValidatorNameCell(props: ValidatorNameCellProps) {
  return (
    <Show
      when={props.size === "sm"}
      else={
        <Stack
          direction="horizontal"
          space="$10"
          attributes={{
            alignItems: "center",
            minWidth: "$28",
          }}
        >
          <Show when={props.validatorId}>
            <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
              {props.validatorId}
            </Text>
          </Show>

          <Box
            as="img"
            width="$14"
            height="$14"
            attributes={{
              src: props.validatorImg,
              alt: props.validatorName,
            }}
          />

          <Text fontWeight="$semibold">{props.validatorName}</Text>
        </Stack>
      }
    >
      <Stack
        direction="horizontal"
        space="$10"
        attributes={{
          alignItems: "center",
          minWidth: "$28",
        }}
      >
        <Show when={props.validatorId}>
          <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
            {props.validatorId}
          </Text>
        </Show>

        <Box
          as="img"
          width="$11"
          height="$11"
          attributes={{
            src: props.validatorImg,
            alt: props.validatorName,
          }}
        />

        <Text fontWeight="$semibold">{props.validatorName}</Text>
      </Stack>
    </Show>
  );
}
