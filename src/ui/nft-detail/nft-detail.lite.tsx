import { useMetadata, Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Button from "../button";
import IconButton from "../icon-button";
import NftTraitList from "../nft-trait-list";
import StarText from "../star-text";
import { store } from "../../models/store";
import NftDetailInfo from "../nft-detail-info";
import NftDetailTopOffer from "../nft-detail-top-offers";
import NftDetailActivityList from "../nft-detail-activity-list";

import * as styles from "./nft-detail.css";
import { NftDetailProps } from "./nft-detail.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetail(props: NftDetailProps) {
  return (
    <Box className={styles.nftDetail}>
      <Stack space="$10">
        <Box flex={1}>
          <Box
            as="img"
            width="$full"
            height="$auto"
            borderRadius="$md"
            attributes={{
              src: props.imgSrc,
            }}
          />
        </Box>
        <Box flex={1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ marginBottom: "$5" }}
          >
            {props?.collectionName}
          </Text>
          <Text
            fontSize="$4xl"
            fontWeight="$semibold"
            attributes={{ marginBottom: "$7" }}
          >
            {props?.tokenName}
          </Text>
          <Stack attributes={{ marginBottom: "$7", alignItems: "center" }}>
            <Text color="$textSecondary" attributes={{ marginRight: "$3" }}>
              Created by
            </Text>
            <Text fontWeight="$semibold">{props?.creatorName}</Text>
          </Stack>
          <Text color="$textSecondary" attributes={{ marginBottom: "7" }}>
            {props?.collectionDesc}
          </Text>
          <StarText label="Minted for" value={props?.mintPrice} />
          <Stack
            attributes={{
              alignItems: "center",
              marginBottom: "$12",
              marginTop: "$4",
            }}
          >
            <Text color="$textSecondary" attributes={{ marginRight: "$3" }}>
              Owned by
            </Text>
            <Text fontWeight="$semibold">{props?.ownerName}</Text>
          </Stack>
          <Show when={props.type === "listForSale"}>
            <Button
              size="md"
              intent="tertiary"
              leftIcon="priceTagLine"
              attributes={{ width: "$full" }}
              onClick={() => props?.onListForSale?.()}
            >
              List for Sale
            </Button>
            <Stack space="$8" attributes={{ marginTop: "$8" }}>
              <Box flex={1}>
                <Button
                  size="sm"
                  intent="text"
                  leftIcon="sendLine"
                  attributes={{ width: "$full" }}
                  onClick={() => props?.onTransfer?.()}
                >
                  Transfer
                </Button>
              </Box>
              <Box flex={1}>
                <Button
                  size="sm"
                  intent="text"
                  leftIcon="fireLine"
                  attributes={{ width: "$full" }}
                  onClick={() => props?.onBurn?.()}
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
              attributes={{ width: "$full" }}
              onClick={() => props?.onMakeOffer?.()}
            >
              Make Offer
            </Button>
          </Show>
          <Show when={props?.type === "buyNow"}>
            <Stack space="$8">
              <Button
                intent="tertiary"
                size="lg"
                leftIcon="shoppingBagLine"
                onClick={() => props?.onBuyNow?.()}
              >
                Buy Now
              </Button>
              <Button
                intent="text"
                size="lg"
                leftIcon="coinsLine"
                onClick={() => props?.onMakeOffer?.()}
              >
                Make Offer
              </Button>
            </Stack>
          </Show>
        </Box>
      </Stack>
      <Stack
        attributes={{
          alignItems: "center",
          marginTop: "$6",
          marginBottom: "$5",
        }}
      >
        <Text color="$textSecondary">Rank</Text>
        <Text fontWeight="$semibold" attributes={{ mx: "$2" }}>
          {store.getState()?.formatNumber?.({ value: props?.rarityOrder })}
        </Text>
        <Text color="$textSecondary">{`of ${store
          .getState()
          ?.formatNumber?.({ value: props?.tokensCount })}`}</Text>
      </Stack>
      <Stack space="$8" attributes={{ marginBottom: "$11" }}>
        <Button size="sm" intent="text" onClick={() => props?.onDownload?.()}>
          Download
        </Button>
        <IconButton
          size="sm"
          icon="uploadLine"
          intent="text"
          onClick={() => props?.onShare?.()}
        />
      </Stack>
      <Show when={!!props?.traits}>
        <NftTraitList list={props?.traits} />
      </Show>
      <Show when={!!props.detailInfo}>
        <Box height="$14" />
        <NftDetailInfo
          price={props?.detailInfo?.price}
          owner={props?.detailInfo?.owner}
          lastSale={props?.detailInfo?.lastSale}
          topOffer={props?.detailInfo?.topOffer}
          floorPrice={props?.detailInfo?.floorPrice}
          isNameVerified={props?.detailInfo?.isNameVerified}
        />
      </Show>
      <Show when={!!props.detailTopOffer}>
        <Box height="$16" />
        <NftDetailTopOffer
          price={props?.detailTopOffer?.price}
          floorPrice={props?.detailTopOffer?.floorPrice}
          expires={props?.detailTopOffer?.expires}
          from={props?.detailTopOffer?.from}
        />
      </Show>

      <Show when={!!props.detailActivity}>
        <Box height="$17" />
        <NftDetailActivityList list={props?.detailActivity?.list} />
      </Show>
    </Box>
  );
}
