import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import starIcon from "../../assets/stars.png";

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
        <Stack align="center">
          <Text
            color="textSecondary"
            size="xs"
            attributes={{ marginRight: "2" }}
          >
            Highest offer
          </Text>
          <Text size="xs" weight="semibold">
            {` ${props?.highestOffer} `} STARS
          </Text>
          <Box
            as="img"
            attributes={{ src: starIcon }}
            marginLeft="3"
            width="8"
            height="8"
          />
        </Stack>
        <Stack align="center">
          <Text
            color="textSecondary"
            size="xs"
            attributes={{ marginRight: "2" }}
          >
            List price
          </Text>
          <Text size="xs" weight="semibold">
            {` ${props?.listPrice} `} STARS
          </Text>
          <Box
            as="img"
            attributes={{ src: starIcon }}
            marginLeft="3"
            width="8"
            height="8"
          />
        </Stack>
      </Stack>
    </Box>
  );
}
