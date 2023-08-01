import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import TokenInput from "../token-input";
import StarIcon from "../../assets/stars.png";
import * as styles from "./nft-make-offer.css";
import { NftMakeOfferProps } from "./nft-make-offer.types";

export default function NftMakeOffer(props: NftMakeOfferProps) {
  return (
    <Box className={styles.container}>
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
          symbol="STARS"
          imgSrc={StarIcon}
        />
      </Box>
      <Button
        size="lg"
        intent="tertiary"
        attributes={{ marginBottom: "$9", width: "$full" }}
      >
        Make Offer
      </Button>
      <Button variant="unstyled" size="sm" attributes={{ width: "$full" }}>
        Cancel
      </Button>
    </Box>
  );
}
