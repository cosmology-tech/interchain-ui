import { Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import starIcon from "../../assets/stars.png";

import { StarTextProps } from "./star-text.types";

export default function StarText(props: StarTextProps) {
  return (
    <Stack align="center">
      <Show when={!!props.label}>
        <Text color="textSecondary" attributes={{ marginRight: "3" }}>
          {props.label}
        </Text>
      </Show>
      <Text
        weight="semibold"
        attributes={{ marginRight: "3" }}
      >{`${props?.value} STARS`}</Text>
      <Box
        as="img"
        attributes={{ src: starIcon }}
        width="8"
        height="8"
      />
    </Stack>
  );
}
