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
import Text from "../text";
import BondingListItem from "../bonding-list-item";
import * as styles from "./bonding-list.css";
import { BondingListProps } from "./bonding-list.types";
import { BondingListItemProps } from "../bonding-list-item/bonding-list-item.types";

export default function BondingList(props: BondingListProps) {
  return (
    <Box>
      <Stack space="10" direction="column">
        <For each={props.list}>
          {(item: BondingListItemProps, index: number) => (
            <BondingListItem
              key={item.title}
              title={item.title}
              apr={item.apr}
              amount={item.amount}
              per={item.per}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
