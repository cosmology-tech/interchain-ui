import { useDefaultProps, Show } from "@builder.io/mitosis";
import Stack from "../../../stack";
import Text from "../../../text";
import Box from "../../../box";
import IconButton from "../../../icon-button";

export default function APR(props: {
  className?: string;
  apr: number;
  innerClassName: string;
  title?: string;
}) {
  return (
    <Stack
      className={props.className}
      attributes={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "full"
      }}
    >
      <Box>
        <Show when={!!props?.title}>
          <Text color="textSecondary" attributes={{ marginBottom: "2" }}>
            {props?.title}
          </Text>
        </Show>

        <Text
          color="text"
          weight="semibold"
          attributes={{
            marginRight: "4",
          }}
        >
          {props.apr}%
        </Text>
      </Box>
      <IconButton
        className={props.innerClassName}
        icon="verticalMore"
        intent="text"
      />
    </Stack>
  );
}
