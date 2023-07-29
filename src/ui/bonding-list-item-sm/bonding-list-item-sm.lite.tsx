import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";

export default function BondingListItemSm(props: BondingListItemSmProps) {
  return (
    <Box
      px="$8"
      py="$10"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      minWidth="350px"
    >
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.title}
          </Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{ marginRight: "$5" }}
            >
              APR
            </Text>
            <Text
              fontSize="$4xl"
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{ marginRight: "$3" }}
            >
              {props.apr}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              %
            </Text>
          </Stack>
          <Button size="sm" intent="tertiary">
            Unbond
          </Button>
        </Box>
        <Stack direction="vertical" space="$0">
          <Stack
            space="0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
              $
            </Text>
            <Text fontWeight="$semibold" fontSize="$4xl">
              {props.amount}
            </Text>
          </Stack>
          <Stack
            space="$0"
            attributes={{
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text fontWeight="$semibold">{props.poolShares}&nbsp;</Text>
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
