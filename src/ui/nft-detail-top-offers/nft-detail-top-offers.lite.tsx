import { useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import StarText from "../star-text";

import * as styles from "./nft-detail-top-offers.css";
import type { NftDetailTopOfferProps } from "./nft-detail-top-offers.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetailTopOffer(props: NftDetailTopOfferProps) {
  return (
    <Stack className={styles.container} direction="vertical" space="$0">
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$6" }}
      >
        Top offers
      </Text>
      <Stack attributes={{ justifyContent: "space-between" }}>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Price
          </Text>
          <StarText value={props?.price} />
        </Stack>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Floor price (%Δ)
          </Text>
          <Text fontWeight="$semibold">{props?.floorPrice}</Text>
        </Stack>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Expires
          </Text>
          <Text fontWeight="$semibold">{props?.expires}</Text>
        </Stack>
        <Stack
          direction="vertical"
          attributes={{ paddingRight: "$8" }}
          space="$0"
        >
          <Text fontSize="$xs" color="$textSecondary">
            From
          </Text>
          <Text fontWeight="$semibold">{props?.from}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
