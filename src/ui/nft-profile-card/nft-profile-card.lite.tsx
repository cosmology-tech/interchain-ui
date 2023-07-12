import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import StarText from "../star-text";

import * as styles from "./nft-profile-card.css";
import { NftProfileCardProps } from "./nft-profile-card.types";

export default function NftProfileCard(props: NftProfileCardProps) {
  return (
    <Box cursor="pointer" attributes={{onClick: () => console.log('NftProfileCard onClick')}}>
      <Stack className={styles.nftProfileCard} direction="column" space="5">
        <Box width="full">
          <Box
            width="full"
            height="auto"
            as="img"
            borderRadius="md"
            attributes={{ src: props?.imgSrc }}
          ></Box>
        </Box>
        <Text weight="semibold">{props?.name}</Text>
        <StarText label="Highest offer" value={props?.highestOffer} />
        <StarText label="List price" value={props?.listPrice} />
      </Stack>
    </Box>
  );
}
