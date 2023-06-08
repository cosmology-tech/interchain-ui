import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import BondingCard from "../bonding-card";
import * as styles from "./bonding-card-list.css";
import { BondingCardListProps } from "./bonding-card-list.types";
import { BondingCardProps } from "../bonding-card/bonding-card.types";

export default function PoolCardList(props: BondingCardListProps) {
  return (
    <Box>
      <Stack space="10" flexWrap="nowrap">
        <For each={props.list}>
          {(item: BondingCardProps, index: number) => (
            <Box width="1/3" key={item.title}>
              <BondingCard title={item.title} value={item.value} />
            </Box>
          )}
        </For>
      </Stack>
    </Box>
  );
}
