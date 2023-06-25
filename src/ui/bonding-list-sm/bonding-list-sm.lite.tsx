import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import * as styles from "./bonding-list-sm.css";
import BondingListItemSm from "../bonding-list-item-sm";
import { BondingListSmProps } from "./bonding-list-sm.types";
import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export default function BondingListSm(props: BondingListSmProps) {
  return (
    <Box width="full">
      <Text size="xl" weight="semibold">
        Bond your liquidity
      </Text>
      <Text attributes={{ marginTop: "2" }}>
        Bond your tokens to earn additional OSMO rewards to the swap fees.
      </Text>
      <Text
        color="textSecondary"
        weight="semibold"
        attributes={{
          marginTop: "10",
        }}
      >
        Unbonded
      </Text>
      <Text size="4xl" weight="semibold" attributes={{ my: "2" }}>
        {props.unbondedAmt}
      </Text>
      <Stack
        attributes={{
          marginBottom: "9",
        }}
      >
        <Text weight="semibold">{props.unbondedShares}</Text>
        <Text>&nbsp; pool shares</Text>
      </Stack>
      <Stack space="10" direction="column">
        <For each={props.list}>
          {(item: BondingListItemSmProps, index: number) => (
            <BondingListItemSm
              key={item.title}
              title={item.title}
              amount={item.amount}
              poolShares={item.poolShares}
              apr={item.apr}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
