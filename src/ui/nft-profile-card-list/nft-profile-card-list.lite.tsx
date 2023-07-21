import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import NftProfileCard from "../nft-profile-card";
import { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";
import * as styles from './nft-profile-card-list.css'
import { NftProfileCardListProps } from "./nft-profile-card-list-types";

export default function NftProfileCardList(props: NftProfileCardListProps) {
  return <Stack className={styles.container} space="10" flexWrap="wrap">
    <For each={props?.list}>
        {(item: NftProfileCardProps, index: number) => (
          <Box key={item?.name}>
            <NftProfileCard
              name={item?.name}
              imgSrc={item?.imgSrc}
              highestOffer={item?.highestOffer}
              listPrice={item?.listPrice}
            />
          </Box>
        )}
      </For>
  </Stack>
}
