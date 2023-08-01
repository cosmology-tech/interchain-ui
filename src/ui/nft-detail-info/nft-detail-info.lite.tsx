import { For, Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import StarText from "../star-text";
import * as styles from "./nft-detail-info.css";
import { NftDetailInfoProps } from "./nft-detail-info.type";
import isNumber from "lodash/isNumber";

export default function NftDetailInfo(props: NftDetailInfoProps) {
  return (
    <Stack className={styles.nftDetailInfo} direction="vertical" space="$7">
      <Text fontSize="$xl" fontWeight="$semibold">
        Info
      </Text>
      <Stack attributes={{ justifyContent: "space-between" }}>
        {/* <For each={["Price", "Last sale", "Owner", "Top offer", "Floor price"]}
      >
        {
          (name: string) => <Stack direction="column">
            <Text>{name}</Text>
          </Stack>
        }
      </For> */}
        <Stack space="$0" direction="vertical">
          <Text fontSize="$xs" color="$textSecondary">
            Price
          </Text>
          <StarText value={props?.price} />
        </Stack>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Last sale
          </Text>
          <Text fontWeight="$semibold">
            {`${
              isNumber(props?.lastSale) ? `${props?.lastSale} STARS` : "---"
            }`}
          </Text>
        </Stack>
        <Stack direction="vertical" space="0">
          <Text fontSize="$xs" color="$textSecondary">
            Owner
          </Text>
          <Stack attributes={{ alignItems: "center" }} space="$0">
            <Text fontWeight="$semibold" attributes={{ marginRight: "$3" }}>
              {props?.owner}
            </Text>
            <Icon
              className={styles.verified}
              name="jaggedCheck"
              size="$md"
              color="$text"
            />
          </Stack>
        </Stack>
        <Stack direction="vertical" space="0">
          <Text fontSize="$xs" color="$textSecondary">
            Top offer
          </Text>
          <StarText value={props?.topOffer} />
        </Stack>
        <Stack
          direction="vertical"
          space="$0"
          attributes={{ paddingRight: "$12" }}
        >
          <Text fontSize="$xs" color="$textSecondary">
            Floor price
          </Text>
          <StarText value={props?.floorPrice} />
        </Stack>
      </Stack>
    </Stack>
  );
}
