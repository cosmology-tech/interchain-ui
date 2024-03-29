import { For, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import BondingListItem from "../bonding-list-item";
import { BondingListProps } from "./bonding-list.types";
import { BondingListItemProps } from "../bonding-list-item/bonding-list-item.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function BondingList(props: BondingListProps) {
  return (
    <Box position="relative" overflowX="auto">
      <Stack direction="vertical" space="$10">
        <For each={props.list}>
          {(item: BondingListItemProps, index: number) => (
            <BondingListItem
              key={item.title}
              title={item.title}
              totalApr={item.totalApr}
              amount={item.amount}
              superfluidApr={item.superfluidApr}
              onUnbond={() => item?.onUnbond?.()}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
