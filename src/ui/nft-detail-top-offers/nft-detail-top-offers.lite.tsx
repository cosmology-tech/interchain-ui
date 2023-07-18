import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import starIcon from "../../assets/stars.png";

import * as styles from './nft-detail-top-offers.css'
import { NftDetailTopOfferProps } from "./nft-detail-top-offers.types";

export default function NftDetailTopOffer(props: NftDetailTopOfferProps) {
  return (
    <Stack className={styles.container} direction="vertical" space="7">
      <Text size="xl" weight="semibold">
        Top offers
      </Text>
      <Stack attributes={{justifyContent: "space-between"}}>
        <Stack direction="vertical">
          <Text size="xs" color="textSecondary">
            Price
          </Text>
          <Stack attributes={{alignItems: "center"}}>
            <Text weight="semibold" attributes={{ marginRight: "3" }}>
              {`${props?.price} STARS`}
            </Text>
            <Box
              as="img"
              width="8"
              height="8"
              attributes={{ src: starIcon }}
            ></Box>
          </Stack>
        </Stack>
        <Stack direction="vertical">
          <Text size="xs" color="textSecondary">
            Floor price (%Δ)
          </Text>
          <Text weight="semibold">{props?.floorPrice}</Text>
        </Stack>
        <Stack direction="vertical">
          <Text size="xs" color="textSecondary">
            Expires
          </Text>
          <Text weight="semibold">{props?.expires}</Text>
        </Stack>
        <Stack direction="vertical" attributes={{ paddingRight: "8" }}>
          <Text size="xs" color="textSecondary">
            From
          </Text>
          <Text weight="semibold">{props?.from}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
