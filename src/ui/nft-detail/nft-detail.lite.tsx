import { For, Show, useStore } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Button from "../button";
import IconButton from "../icon-button";
import NftTraitList from "../nft-trait-list";
import BasicModal from "../basic-modal";
import ListForSale from "../list-for-sale";
import NftMakeOffer from "../nft-make-offer";
import StarText from "../star-text";
import { store } from "../../models/store";
import NftDetailInfo from "../nft-detail-info";
import NftDetailTopOffer from "../nft-detail-top-offers";
import NftDetailActivityList from "../nft-detail-activity-list";

import * as styles from "./nft-detail.css";
import { NftDetailProps } from "./nft-detail.types";

export default function NftDetail(props: NftDetailProps) {
  const state = useStore<{
    showListForSaleModal: boolean;
    openListForSale: () => void;
    closeListForSale: () => void;
    showMakeOfferModal: boolean;
    openMakeOffer: () => void;
    closeMakeOffer: () => void;
  }>({
    showListForSaleModal: false,
    showMakeOfferModal: false,
    openListForSale() {
      state.showListForSaleModal = true;
    },
    closeListForSale() {
      state.showListForSaleModal = false;
    },
    openMakeOffer() {
      state.showMakeOfferModal = true;
    },
    closeMakeOffer() {
      state.showMakeOfferModal = false;
    },
  });
  return (
    <Box className={styles.nftDetail}>
      <Stack space="10">
        <Box flex={1}>
          <Box
            as="img"
            width="full"
            height="auto"
            borderRadius="md"
            attributes={{
              src: props.imgSrc,
            }}
          />
        </Box>
        <Box flex={1}>
            <Text
              color="textSecondary"
              weight="semibold"
              attributes={{ marginBottom: "5" }}
            >
              {props?.collectionName}
            </Text>
            <Text
              size="4xl"
              weight="semibold"
              attributes={{ marginBottom: "7" }}
            >
              {props?.tokenName}
            </Text>
            <Stack attributes={{ marginBottom: "7", alignItems: "center" }}>
              <Text color="textSecondary" attributes={{ marginRight: "3" }}>
                Created by
              </Text>
              <Text weight="semibold">{props?.creatorName}</Text>
            </Stack>
            <Text color="textSecondary" attributes={{ marginBottom: "7" }}>
              {props?.collectionDesc}
            </Text>
            <StarText label="Minted for" value={props?.mintPrice} />
            <Stack
              attributes={{ alignItems:"center", marginBottom: "12", marginTop: "4" }}
            >
              <Text color="textSecondary" attributes={{ marginRight: "3" }}>
                Owned by
              </Text>
              <Text weight="semibold">{props?.ownerName}</Text>
            </Stack>
            <Show when={props.type === "listForSale"}>
              <Button
                size="lg"
                intent="tertiary"
                leftIcon="priceTagLine"
                attributes={{ marginBottom: "8", width: "full"}}
                onClick={() => state.openListForSale()}
              >
                List for Sale
              </Button>
              <Stack space="8">
                <Box flex={1}>
                  <Button
                    size="sm"
                    intent="text"
                    leftIcon="sendLine"
                    attributes={{ width: "full" }}
                  >
                    Transfer
                  </Button>
                </Box>
                <Box flex={1}>
                  <Button
                    size="sm"
                    intent="text"
                    leftIcon="fireLine"
                    attributes={{ width: "full" }}
                  >
                    Burn
                  </Button>
                </Box>
              </Stack>
            </Show>
            <Show when={props?.type === "makeOffer"}>
              <Button
                intent="tertiary"
                size="lg"
                leftIcon="coinsLine"
                onClick={() => state.openMakeOffer()}
                attributes={{width: "full"}}
              >
                Make Offer
              </Button>
            </Show>
            <Show when={props?.type === "buyNow"}>
              <Stack space="8">
                <Button intent="tertiary" size="lg" leftIcon="shoppingBagLine">
                  Buy Now
                </Button>
                <Button
                  intent="text"
                  size="lg"
                  leftIcon="coinsLine"
                  onClick={() => state.openMakeOffer()}
                >
                  Make Offer
                </Button>
              </Stack>
            </Show>
        </Box>
      </Stack>
      <Stack  attributes={{ alignItems: "center", marginTop: "6", marginBottom: "5" }}>
        <Text color="textSecondary">Rank</Text>
        <Text weight="semibold" attributes={{ mx: "2" }}>
          {store.getState()?.formatNumber?.({ value: props?.rarityOrder })}
        </Text>
        <Text color="textSecondary">{`of ${store
          .getState()
          ?.formatNumber?.({ value: props?.tokensCount })}`}</Text>
      </Stack>
      <Stack space="8" attributes={{ marginBottom: "11" }}>
        <Button size="sm" intent="text">
          Download
        </Button>
        <IconButton size="sm" icon="uploadLine" intent="text" />
      </Stack>
      <NftTraitList list={props?.traits} />
      <Show when={props?.type === "makeOffer"}>
        <Box height="14" />
        <NftDetailInfo
          price={props?.detailInfo?.price}
          owner={props?.detailInfo?.owner}
          lastSale={props?.detailInfo?.lastSale}
          topOffer={props?.detailInfo?.topOffer}
          floorPrice={props?.detailInfo?.floorPrice}
          isNameVerified={props?.detailInfo?.isNameVerified}
        />
        <Box height="16" />
        <NftDetailTopOffer
          price={props?.detailTopOffer?.price}
          floorPrice={props?.detailTopOffer?.floorPrice}
          expires={props?.detailTopOffer?.expires}
          from={props?.detailTopOffer?.from}
        />
        <Box height="17" />
        <NftDetailActivityList list={props?.detailActivity?.list} />
      </Show>

      {/* List for Sale Modal */}
      <BasicModal
        modalContentClassName={styles.listForSaleModal}
        isOpen={state.showListForSaleModal}
        title="List for Sale"
        onClose={() => state.closeListForSale()}
      >
        <ListForSale />
      </BasicModal>

      {/* Make Offer Modal */}
      <BasicModal
        modalContentClassName={styles.makeOfferModal}
        isOpen={state.showMakeOfferModal}
        title="Make Offer"
        onClose={() => state.closeMakeOffer()}
      >
        <NftMakeOffer
          imgSrc="https://res.cloudinary.com/stargaze/image/upload/erom1wypzaxaratnm7dg.jpg"
          tokenName="KUJIRANS #763"
        />
      </BasicModal>
    </Box>
  );
}
