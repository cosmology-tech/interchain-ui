import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import BondingListItem from "../bonding-list-item";
import { BondingListProps } from "./bonding-list.types";
import { BondingListItemProps } from "../bonding-list-item/bonding-list-item.types";

export default function BondingList(props: BondingListProps) {
  return (
    <Box>
      <Stack direction="column" space="10">
        <For each={props.list}>
          {(item: BondingListItemProps, index: number) => (
            <BondingListItem
              key={item.title}
              title={item.title}
              apr={item.apr}
              amount={item.amount}
              per={item.per}
              onUnbond={(e) => item.onUnbond?.(e)}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
