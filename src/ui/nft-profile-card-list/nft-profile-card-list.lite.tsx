import { For, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import NftProfileCard from "../nft-profile-card";

import type { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";
import type { NftProfileCardListProps } from "./nft-profile-card-list-types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftProfileCardList(props: NftProfileCardListProps) {
  return (
    <Box
      display="grid"
      gap="$6"
      gridTemplateColumns="repeat(auto-fit, minmax(232px, 1fr))"
      className={props.className}
      {...props.attributes}
    >
      <For each={props?.list}>
        {(item: NftProfileCardProps, index: number) => (
          <Box key={`${item?.name}-${index}`}>
            <NftProfileCard
              key={item.imgSrc}
              name={item?.name}
              imgSrc={item?.imgSrc}
              highestOffer={item?.highestOffer}
              listPrice={item?.listPrice}
            />
          </Box>
        )}
      </For>
    </Box>
  );
}
