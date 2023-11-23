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

import type {
  NftDetailProps,
  ListForSale,
  MakeOffer,
  BuyNow,
} from "./nft-detail.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetail(props: NftDetailProps) {
  return (
    <Box
      className={props.className}
      maxWidth={{
        mobile: "unset",
        tablet: "776px",
        desktop: "776px",
      }}
      {...props.attributes}
    >
      <Box
        display="flex"
        flexDirection={{
          mobile: "column",
          tablet: "row",
          desktop: "row",
        }}
        gap={{
          mobile: "$6",
          tablet: "$10",
          desktop: "$10",
        }}
      >
        {/* Main Image */}
        <Box
          flex={1}
          borderRadius="$md"
          borderColor="$divider"
          borderWidth="0.5px"
          borderStyle="solid"
        >
          <Box
            as="img"
            width="$full"
            height="$auto"
            borderRadius="$md"
            maxHeight={{
              mobile: "$30",
              tablet: "unset",
              desktop: "unset",
            }}
            objectFit="contain"
            attributes={{
              src: props.imgSrc,
              alt: props.collectionName,
            }}
          />
        </Box>

        <Box flex={1}>
          <Text
            color="$textSecondary"
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
              desktop: "$sm",
            }}
            fontWeight="$semibold"
            attributes={{
              marginBottom: { mobile: "$2", tablet: "$5", desktop: "$5" },
            }}
          >
            {props.collectionName}
          </Text>
          <Text
            fontSize={{
              mobile: "$2xl",
              tablet: "$4xl",
              desktop: "$4xl",
            }}
            fontWeight="$semibold"
            attributes={{
              marginBottom: { mobile: "$4", tablet: "$7", desktop: "$7" },
            }}
          >
            {props.name}
          </Text>

          <Stack attributes={{ marginBottom: "$7", alignItems: "center" }}>
            <Text
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              color="$textSecondary"
              attributes={{ marginRight: "$3" }}
            >
              Created by
            </Text>
            <Text
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              fontWeight="$semibold"
            >
              {props.creatorName}
            </Text>
          </Stack>

          <Text
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
              desktop: "$sm",
            }}
            color="$textSecondary"
            attributes={{ marginBottom: "$7" }}
          >
            {props.collectionDesc}
          </Text>

          <StarText label="Minted for" value={props.mintPrice} />

          <Stack
            attributes={{
              alignItems: "center",
              marginBottom: "$12",
              marginTop: "$4",
            }}
          >
            <Text
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              color="$textSecondary"
              attributes={{ marginRight: "$3" }}
            >
              Owned by
            </Text>
            <Text
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              fontWeight="$semibold"
            >
              {props.ownerName}
            </Text>
          </Stack>

          {/* ==== CTA */}
          <Show when={props.type === "listForSale"}>
            <Button
              fluidWidth
              size="md"
              intent="tertiary"
              leftIcon="priceTagLine"
              onClick={() => (props as ListForSale).onListForSale?.()}
            >
              List for Sale
            </Button>

            <Stack space="$8" attributes={{ marginTop: "$8" }}>
              <Box flex={1}>
                <Button
                  fluidWidth
                  size="sm"
                  intent="text"
                  leftIcon="sendLine"
                  onClick={() => (props as ListForSale).onTransfer?.()}
                >
                  Transfer
                </Button>
              </Box>
              <Box flex={1}>
                <Button
                  fluidWidth
                  size="sm"
                  intent="text"
                  leftIcon="fireLine"
                  attributes={{ width: "$full" }}
                  onClick={() => (props as ListForSale).onBurn?.()}
                >
                  Burn
                </Button>
              </Box>
            </Stack>
          </Show>

          <Show when={props.type === "makeOffer"}>
            <Button
              fluidWidth
              intent="tertiary"
              size="md"
              leftIcon="coinsLine"
              onClick={() => (props as MakeOffer).onMakeOffer?.()}
            >
              Make Offer
            </Button>
          </Show>

          <Show when={props.type === "buyNow"}>
            <Stack space="$8">
              <Button
                fluidWidth
                intent="tertiary"
                size="md"
                leftIcon="shoppingBagLine"
                onClick={() => (props as BuyNow).onBuyNow?.()}
              >
                Buy Now
              </Button>
              <Button
                fluidWidth
                intent="text"
                size="md"
                leftIcon="coinsLine"
                onClick={() => (props as BuyNow).onMakeOffer?.()}
              >
                Make Offer
              </Button>
            </Stack>
          </Show>

          <Show when={props.type === "custom"}>{props.children}</Show>
        </Box>
      </Box>

      {/* Supply details */}
      <Stack
        attributes={{
          alignItems: "center",
          marginTop: "$6",
          marginBottom: "$5",
        }}
      >
        <Text color="$textSecondary">Rank</Text>
        <Text fontWeight="$semibold" attributes={{ mx: "$2" }}>
          {store.getState()?.formatNumber?.({ value: props.rarityOrder })}
        </Text>
        <Text color="$textSecondary">{`of ${store
          .getState()
          ?.formatNumber?.({ value: props.tokensCount })}`}</Text>
      </Stack>

      <Stack space="$8" attributes={{ marginBottom: "$11" }}>
        <Button size="sm" intent="text" onClick={() => props.onDownload?.()}>
          Download
        </Button>
        <IconButton
          size="sm"
          icon="uploadLine"
          intent="text"
          onClick={() => props.onShare?.()}
        />
      </Stack>

      {/* Traits */}
      <Show when={!!props.traits}>
        <NftTraitList list={props.traits} />
      </Show>

      <Show when={!!props.detailInfo}>
        <Box height="$14" />
        <NftDetailInfo
          price={props.detailInfo?.price}
          owner={props.detailInfo?.owner}
          lastSale={props.detailInfo?.lastSale}
          topOffer={props.detailInfo?.topOffer}
          floorPrice={props.detailInfo?.floorPrice}
          isNameVerified={props.detailInfo?.isNameVerified}
        />
      </Show>

      <Show when={!!props.detailTopOffer}>
        <Box height="$16" />
        <NftDetailTopOffer
          price={props.detailTopOffer?.price}
          floorPrice={props.detailTopOffer?.floorPrice}
          expires={props.detailTopOffer?.expires}
          from={props.detailTopOffer?.from}
        />
      </Show>

      <Show when={!!props.detailActivity}>
        <Box height="$17" />
        <NftDetailActivityList list={props.detailActivity?.list} />
      </Show>
    </Box>
  );
}
