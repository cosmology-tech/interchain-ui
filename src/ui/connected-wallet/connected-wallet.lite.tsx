import { Show, useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import ClipboardCopyText from "../clipboard-copy-text";
import type { ConnectedWalletProps } from "./connected-wallet.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectedWallet(props: ConnectedWalletProps) {
  useDefaultProps({
    truncate: "middle",
    midTruncateLimit: "sm",
    btnText: "My Wallet",
  });

  return (
    <Box width="$fit" px="$8" py="$15">
      <Stack direction="vertical" attributes={{ alignItems: "center" }}>
        <Show
          when={props.avatar}
          else={
            <Icon
              name="astronaut"
              size="$13xl"
              attributes={{
                borderRadius: "$full",
                marginTop: "$5",
              }}
            />
          }
        >
          <Box
            as="img"
            attributes={{ src: props.avatar }}
            borderRadius="$full"
            width="$18"
            height="$18"
            marginTop="$5"
          />
        </Show>

        <Text
          fontSize="$xl"
          fontWeight="$semibold"
          attributes={{ marginTop: "$8", marginBottom: "$8" }}
        >
          {props.name}
        </Text>
        <Box marginBottom="$8">
          <ClipboardCopyText
            text={props.address}
            truncate={props.truncate}
            midTruncateLimit={props.midTruncateLimit}
            onCopied={() => props?.onCopied?.()}
          />
        </Box>
        <Button onClick={() => props.onClick?.()}>{props.btnText}</Button>
      </Stack>
    </Box>
  );
}
