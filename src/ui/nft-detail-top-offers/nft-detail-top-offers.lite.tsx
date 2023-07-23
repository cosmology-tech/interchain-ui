import Stack from "../stack";
import Text from "../text";
import StarText from "../star-text";

import * as styles from './nft-detail-top-offers.css'
import { NftDetailTopOfferProps } from "./nft-detail-top-offers.types";

export default function NftDetailTopOffer(props: NftDetailTopOfferProps) {
  return (
    <Stack className={styles.container} direction="vertical">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "6" }}>
        Top offers
      </Text>
      <Stack attributes={{justifyContent: "space-between"}}>
        <Stack direction="vertical">
          <Text size="xs" color="textSecondary">
            Price
          </Text>
          <StarText value={props?.price} />
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
