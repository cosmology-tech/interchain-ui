import { For, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import NftTraitListItem from "../nft-trait-list-item";
import { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import { NftTraitListProps } from "./nft-trait-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftTraitList(props: NftTraitListProps) {
  return (
    <Box
      className={props.className}
      display="grid"
      gridTemplateColumns={{
        mobile: "repeat(auto-fit, minmax(250px, 1fr))",
        tablet: "repeat(auto-fit, minmax(329px, 1fr))",
      }}
      rowGap={{
        mobile: "$4",
        tablet: "$8",
        desktop: "$8",
      }}
      columnGap={{
        mobile: "$12",
        tablet: "$17",
        desktop: "$17",
      }}
      {...props.attributes}
    >
      <For each={props.list}>
        {(item: NftTraitListItemProps, index: number) => (
          <Box key={index}>
            <NftTraitListItem
              key={item?.name}
              name={item?.name}
              value={item?.value}
              rarityPercent={item?.rarityPercent}
            />
          </Box>
        )}
      </For>
    </Box>
  );
}
