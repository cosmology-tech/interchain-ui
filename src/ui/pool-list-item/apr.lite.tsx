import { Show, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import IconButton from "../icon-button";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

// TODO: replace buttons

export default function APR(props: {
  className?: string;
  apr: string;
  innerClassName: string;
  title?: string;
}) {
  return (
    <Stack
      className={props.className}
      attributes={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "$full",
      }}
    >
      <Box>
        <Show when={!!props?.title}>
          <Text color="$textSecondary" attributes={{ marginBottom: "$2" }}>
            {props?.title}
          </Text>
        </Show>

        <Text
          color="$text"
          fontWeight="$semibold"
          attributes={{
            marginRight: "$4",
          }}
        >
          {props.apr}%
        </Text>
      </Box>

      <IconButton
        variant="ghost"
        intent="text"
        className={props.innerClassName}
        icon="verticalMore"
      />
    </Stack>
  );
}
