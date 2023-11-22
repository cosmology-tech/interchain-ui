import { Show, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Icon from "../icon";
import Text from "../text";

import type { StarTextProps } from "./star-text.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function StarText(props: StarTextProps) {
  return (
    <div className={props.className} onClick={props.onClick}>
      <Stack attributes={{ alignItems: "center" }}>
        <Show when={!!props.label}>
          <Text color="$textSecondary" attributes={{ marginRight: "$3" }}>
            {props.label}
          </Text>
        </Show>

        <Text fontWeight="$semibold" attributes={{ marginRight: "$3" }}>{`${
          props.value
        } ${props.tokenName ?? "STARS"}`}</Text>

        <Show when={!props.iconSrc}>
          <Icon
            name="stargazePixel"
            size="$md"
            attributes={{
              borderRadius: "$full",
              backgroundColor: "$black",
            }}
          />
        </Show>

        <Show when={typeof props.iconSrc === "string"}>
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
    </div>
  );
}
