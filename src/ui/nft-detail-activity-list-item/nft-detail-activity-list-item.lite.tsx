import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";

import * as styles from "./nft-detail-activity-list-item.css";
import { NftDetailActivityListItemProps } from "./nft-detail-activity-list-item.types";

export default function NftDetailActivityListItem(
  props: NftDetailActivityListItemProps
) {
  return (
    <Stack
      className={styles.container}
      attributes={{ justifyContent: "space-between", paddingRight: "15" }}
    >
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Icon name="priceTagLine" size="md" color="text" />
          <Text attributes={{ marginLeft: "9", marginRight: "12" }}>
            {props?.event}
          </Text>
          <Text size="xs" color="textSecondary">{`${props?.price} STAR`}</Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            size="xs"
            color="textSecondary"
            attributes={{ marginRight: "2" }}
          >
            from
          </Text>
          <Text size="xs" weight="semibold">
            {props?.from}
          </Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            size="xs"
            color="textSecondary"
            attributes={{ marginRight: "2" }}
          >
            to
          </Text>
          <Text size="xs" weight="semibold">
            {props?.to ?? "---"}
          </Text>
        </Stack>
      </Box>
      <Box flex={1}>
        <Text size="xs" color="textSecondary">
          {props?.date}
        </Text>
      </Box>
    </Stack>
  );
}
