import {
  useMetadata,
  useStore,
  useDefaultProps,
  Show,
} from "@builder.io/mitosis";
import copy from "copy-to-clipboard";

import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { NobleTxDirectionCardProps } from "./noble.types";
import { truncateTextMiddle } from "../../helpers/string";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NobleTxDirectionCardProps>>({
  addressDisplayLength: 18,
});

export default function NobleTxDirectionCard(props: NobleTxDirectionCardProps) {
  const state = useStore<{
    copied: boolean;
    onCopy: () => void;
    truncate: (text: string) => string;
  }>({
    copied: false,
    onCopy: () => {
      const success = copy(props.address);

      if (success) {
        state.copied = true;
        setTimeout(() => {
          state.copied = false;
        }, 1000);
      }
    },
    truncate: (text: string) => {
      return truncateTextMiddle(text, props.addressDisplayLength);
    },
  });

  return (
    <Box>
      <Text
        color="$textSecondary"
        lineHeight="$short"
        attributes={{ mb: "$1" }}
      >
        {props.direction}
      </Text>
      <Text
        color="$text"
        fontWeight="$semibold"
        fontSize="$xl"
        lineHeight="$short"
        attributes={{ mb: "$1" }}
      >
        {props.chainName}
      </Text>
      <Box display="flex" alignItems="center" gap="$4">
        <Box
          as="img"
          width="$8"
          height="$8"
          attributes={{
            src: props.logoUrl,
            alt: props.chainName,
          }}
        />
        <Text color="$textSecondary" fontSize="$sm">
          {state.truncate(props.address)}
        </Text>

        <Show
          when={!state.copied}
          else={<Icon name="checkLine" size="$lg" color="$textSuccess" />}
        >
          <Box attributes={{ onClick: state.onCopy }} cursor="pointer">
            <Icon name="copy" color="$textSecondary" size="$md" />
          </Box>
        </Show>
      </Box>
    </Box>
  );
}
