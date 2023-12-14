import { Show, useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Icon from "../icon";
import Text from "../text";
import { formatNumeric } from "../../helpers/number";

import type { StarTextProps } from "./star-text.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StarTextProps>>({
  size: "md",
  tokenName: "STARS",
  showTokenIcon: true,
});

export default function StarText(props: StarTextProps) {
  return (
    <Box
      className={props.className}
      attributes={{
        ...props.attributes,
        onClick: () => props.onClick?.(),
      }}
    >
      <Stack attributes={{ alignItems: "center" }}>
        <Show when={!!props.label}>
          <Text
            fontSize={props.size === "md" ? "$sm" : "$xl"}
            color="$textSecondary"
            attributes={{ marginRight: "$3" }}
          >
            {props.label}
          </Text>
        </Show>

        <Text
          fontSize={props.size === "md" ? "$sm" : "$xl"}
          fontWeight="$semibold"
          attributes={{ marginRight: "$3" }}
        >{`${formatNumeric(props.value, 2)} ${props.tokenName}`}</Text>

        <Show when={!props.iconSrc && props.showTokenIcon}>
          <Icon
            name="stargazePixel"
            size="$md"
            attributes={{
              borderRadius: "$full",
              backgroundColor: "$black",
            }}
          />
        </Show>

        <Show when={typeof props.iconSrc === "string" && props.showTokenIcon}>
          <Box
            width="$8"
            height="$8"
            as="img"
            borderRadius="$full"
            backgroundColor="$gray300"
            attributes={{
              src: props.iconSrc,
              alt: "nft token icon",
            }}
          />
        </Show>
      </Stack>
    </Box>
  );
}
