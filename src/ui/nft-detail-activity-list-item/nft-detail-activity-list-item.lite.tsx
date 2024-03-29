import { useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";

import * as styles from "./nft-detail-activity-list-item.css";
import type { NftDetailActivityListItemProps } from "./nft-detail-activity-list-item.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetailActivityListItem(
  props: NftDetailActivityListItemProps
) {
  return (
    <Stack
      className={styles.container}
      attributes={{ justifyContent: "space-between", paddingRight: "$15" }}
    >
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Icon name="priceTagLine" size="$md" color="$text" />
          <Text attributes={{ marginLeft: "$9", marginRight: "$12" }}>
            {props?.event}
          </Text>
          <Text
            fontSize="$xs"
            color="$textSecondary"
          >{`${props?.price} ${props.tokenName}`}</Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            fontSize="$xs"
            color="$textSecondary"
            attributes={{ marginRight: "$2" }}
          >
            {props.fromLabel ?? "from"}
          </Text>
          <Text fontSize="$xs" fontWeight="$semibold">
            {props?.from}
          </Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            fontSize="$xs"
            color="$textSecondary"
            attributes={{ marginRight: "$2" }}
          >
            {props.toLabel ?? "from"}
          </Text>
          <Text fontSize="$xs" fontWeight="$semibold">
            {props?.to ?? "---"}
          </Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Text fontSize="$xs" color="$textSecondary">
          {props?.date}
        </Text>
      </Box>
    </Stack>
  );
}
