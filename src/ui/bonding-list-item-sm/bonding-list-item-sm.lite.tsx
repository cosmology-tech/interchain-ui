import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import * as styles from "./bonding-list-item-sm.css";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";

export default function BondingListItemSm(props: BondingListItemSmProps) {
  return (
    <Box
      px="8"
      py="10"
      backgroundColor="cardBg"
      borderRadius="lg"
      className={styles.container}
    >
      <Stack
        space="0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Text color="textSecondary" weight="semibold">
            {props.title}
          </Text>
          <Stack
            space="0"
            attributes={{
              alignItems: "baseline",
              paddingTop: "3",
              paddingBottom: "9",
            }}
          >
            <Text
              color="textSecondary"
              weight="semibold"
              attributes={{ paddingRight: "5" }}
            >
              APR
            </Text>
            <Text
              size="4xl"
              color="textSecondary"
              weight="semibold"
              attributes={{ paddingRight: "3" }}
            >
              {props.apr}
            </Text>
            <Text color="textSecondary" weight="semibold">
              %
            </Text>
          </Stack>
          <Button size="sm" intent="tertiary" variant="outlined">
            Unbond
          </Button>
        </Box>
        <Stack direction="vertical" space="0">
          <Stack
            space="0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text weight="semibold" attributes={{ marginRight: "1" }}>
              $
            </Text>
            <Text weight="semibold" size="4xl">
              {props.amount}
            </Text>
          </Stack>
          <Stack
            space="0"
            attributes={{
              paddingTop: "3",
              paddingBottom: "9",
            }}
          >
            <Text weight="semibold">{props.poolShares}&nbsp;</Text>
            <Text>pool shares</Text>
          </Stack>
          <Button size="sm" intent="tertiary">
            Bond more
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
