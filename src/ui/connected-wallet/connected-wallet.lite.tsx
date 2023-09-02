import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import astronaut from "../../assets/astronaut.svg";

import { ConnectedWalletProps } from "./connected-wallet.types";
import ClipboardCopyText from "../clipboard-copy-text";

export default function ConnectedWallet(props: ConnectedWalletProps) {
  useDefaultProps({
    truncate: "middle",
    midTruncateLimit: "sm",
    btnText: "My Wallet",
  });
  return (
    <Box width="$fit" px="$8" py="$15">
      <Stack direction="vertical" attributes={{ alignItems: "center" }}>
        <Box
          as="img"
          attributes={{ src: props.avatar ? props.avatar : astronaut }}
          borderRadius="$full"
          width="$18"
          height="$18"
          marginTop="$5"
        />
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
