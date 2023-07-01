import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";

export default function BondingListItemSm(props: BondingListItemSmProps) {
  return (
    <Box px="8" py="10" backgroundColor="cardBg" borderRadius="lg">
      <Stack justify="space-between">
        <Stack direction="column">
          <Text color="textSecondary" weight="semibold">
            {props.title}
          </Text>
          <Stack
            align="baseline"
            attributes={{
              marginTop: "3",
              marginBottom: "9",
            }}
          >
            <Text
              color="textSecondary"
              weight="semibold"
              attributes={{ marginRight: "5" }}
            >
              APR
            </Text>
            <Text size="4xl" color="textSecondary" weight="semibold">
              {props.apr}
            </Text>
          </Stack>
          <Button size="sm" intent="tertiary" variant="outlined">
            Unbond
          </Button>
        </Stack>
        <Stack direction="column">
          <Stack align="baseline">
            <Text weight="semibold" attributes={{ marginRight: "1" }}>
              $
            </Text>
            <Text weight="semibold" size="4xl">
              {props.amount}
            </Text>
          </Stack>
          <Stack
            attributes={{
              marginTop: "3",
              marginBottom: "9",
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
