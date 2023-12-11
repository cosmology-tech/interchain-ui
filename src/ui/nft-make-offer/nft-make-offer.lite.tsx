import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import TokenInput from "../token-input";
import * as styles from "./nft-make-offer.css";
import type { NftMakeOfferProps } from "./nft-make-offer.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NftMakeOfferProps>>({
  symbol: "STARS",
  makeOfferLabel: "Make Offer",
  cancelLabel: "Cancel",
});

export default function NftMakeOffer(props: NftMakeOfferProps) {
  return (
    <Box className={styles.container} {...props.attributes}>
      <Stack attributes={{ alignItems: "center" }} space="$0">
        <Box
          as="img"
          width="$13"
          height="$13"
          borderRadius="$md"
          marginRight="$5"
          attributes={{ src: props?.imgSrc }}
        />
        <Text attributes={{ marginRight: "$2" }}>for</Text>
        <Text fontWeight="$semibold">{props.tokenName}</Text>
      </Stack>

      <Box my="$12">
        <TokenInput
          title="Price"
          hasProgressBar={false}
          symbol={props.symbol}
          tokenIcon="stargazePixel"
          amount={props?.value}
          onAmountChange={(value) => props?.onChange?.(value)}
        />
      </Box>

      <Button
        size="lg"
        intent="tertiary"
        fluidWidth
        attributes={{ marginBottom: "$9" }}
        onClick={() => props?.onMakeOffer?.()}
      >
        {props.makeOfferLabel}
      </Button>

      <Box pt="$9">
        <Button
          fluidWidth
          variant="unstyled"
          size="md"
          onClick={() => props?.onCancel?.()}
        >
          {props.cancelLabel}
        </Button>
      </Box>
    </Box>
  );
}
