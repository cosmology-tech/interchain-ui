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
      <Text color="$textSecondary" fontSize="$sm" lineHeight="1.4">
        {props.direction}
      </Text>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        lineHeight="1.4"
        attributes={{ mb: "$2" }}
      >
        {props.chainName}
      </Text>
      <Box display="flex" alignItems="center" gap="$5">
        <Box
          as="img"
          borderRadius="$full"
          width="18px"
          height="18px"
          attributes={{
            src: props.logoUrl,
            alt: props.chainName,
          }}
        />
        <Text color="$textSecondary" fontSize="$xs">
          {state.truncate(props.address)}
        </Text>

        <Show
          when={!state.copied}
          else={<Icon name="checkLine" size="$md" color="$textSuccess" />}
        >
          <Box attributes={{ onClick: state.onCopy }} cursor="pointer">
            <Icon name="copy" color="$textSecondary" size="$md" />
          </Box>
        </Show>
      </Box>
    </Box>
  );
}
