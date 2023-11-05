import { For, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import NftProfileCard from "../nft-profile-card";
import * as styles from "./nft-profile-card-list.css";

import type { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";
import type { NftProfileCardListProps } from "./nft-profile-card-list-types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftProfileCardList(props: NftProfileCardListProps) {
  return (
    <Stack
      className={styles.container}
      space="$10"
      attributes={{ flexWrap: "wrap" }}
    >
      <For each={props?.list}>
        {(item: NftProfileCardProps, index: number) => (
          <Box key={item?.name}>
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
    </Stack>
  );
}
