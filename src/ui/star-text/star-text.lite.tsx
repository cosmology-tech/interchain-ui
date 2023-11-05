import { Show, useMetadata } from "@builder.io/mitosis";
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
    <Stack attributes={{ alignItems: "center" }}>
      <Show when={!!props.label}>
        <Text color="$textSecondary" attributes={{ marginRight: "$3" }}>
          {props.label}
        </Text>
      </Show>

      <Text
        fontWeight="$semibold"
        attributes={{ marginRight: "$3" }}
      >{`${props?.value} STARS`}</Text>

      <Icon
        name="stargazePixel"
        size="$md"
        attributes={{
          borderRadius: "$full",
          backgroundColor: "$black",
        }}
      />
    </Stack>
  );
}
