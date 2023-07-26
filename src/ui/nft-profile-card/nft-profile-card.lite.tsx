import { useStore } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import StarText from "../star-text";
import BasicModal from "../basic-modal";
import NftDetail from "../nft-detail";

import * as styles from "./nft-profile-card.css";
import { NftProfileCardProps } from "./nft-profile-card.types";

export default function NftProfileCard(props: NftProfileCardProps) {
  const state = useStore<{
    ifShowDetail: boolean;
    open: () => void;
    close: () => void;
  }>({
    ifShowDetail: false,
    open() {
      state.ifShowDetail = true;
    },
    close() {
      state.ifShowDetail = false;
    },
  });
  return (
    <Box
      className={styles.nftProfileCard}
      cursor="pointer"
      attributes={{ onClick: () => state.open() }}
    >
      <Stack direction="vertical" space="4">
        <Box width="full">
          <Box
            width="full"
            height="auto"
            as="img"
            borderRadius="md"
            attributes={{ src: props?.imgSrc }}
          ></Box>
        </Box>
        <Text weight="semibold">{props?.name}</Text>
        <StarText label="Highest offer" value={props?.highestOffer} />
        <StarText label="List price" value={props?.listPrice} />
      </Stack>
      <BasicModal
        isOpen={state.ifShowDetail}
        title="NFT Detail"
        onClose={() => state.close()}
        modalContentClassName={styles.nftDetailModal}
      >
        <NftDetail
          type="makeOffer"
          imgSrc={props.imgSrc}
          collectionName="Shnubbles Breakfast Drop #2"
          tokenName={props.name}
          creatorName="stars1ducj...vl342f"
          collectionDesc="The tastiest NFT-heroes of the interchain Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend."
          mintPrice="300"
          rarityOrder={2864}
          tokensCount={10000}
          ownerName="shane.stars"
          traits={[
            {
              name: "Accessories",
              value: "Oval Gadget",
              rarityPercent: 19.8,
            },
            {
              name: "Head",
              value: "Snowman Hat",
              rarityPercent: 16.71,
            },
            {
              name: "Eyes",
              value: "Teal Predator",
              rarityPercent: 10.05,
            },
            {
              name: "Mouth",
              value: "Bashed",
              rarityPercent: 9.69,
            },
            {
              name: "Background",
              value: "Navy Blue",
              rarityPercent: 10.44,
            },
            {
              name: "Skin",
              value: "Navy Blue",
              rarityPercent: 10.44,
            },
            {
              name: "Costumes",
              value: "Vshok",
              rarityPercent: 6.45,
            },
          ]}
        />
      </BasicModal>
    </Box>
  );
}
