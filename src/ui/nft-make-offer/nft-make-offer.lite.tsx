import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import TokenInput from "../token-input";
import StarIcon from "../../assets/stars.png";
import * as styles from './nft-make-offer.css'
import { NftMakeOfferProps } from "./nft-make-offer.types";

export default function NftMakeOffer(props: NftMakeOfferProps) {
  return (
    <Stack direction="column" className={styles.container}>
      <Stack align="center">
        <Box
          as="img"
          width="13"
          height="13"
          borderRadius="md"
          marginRight="5"
          attributes={{ src: props?.imgSrc }}
        />
        <Text attributes={{ marginRight: "2" }}>for</Text>
        <Text weight="semibold">{props.tokenName}</Text>
      </Stack>
      <Box my="12">
        <TokenInput
          title="Price"
          hasProgressBar={false}
          symbol="STARS"
          imgSrc={StarIcon}
        />
      </Box>
      <Button size="lg" intent="tertiary" attributes={{ marginBottom: "9" }}>
        Make Offer
      </Button>
      <Button variant="unstyled" size="sm">
        Cancel
      </Button>
    </Stack>
  );
}
