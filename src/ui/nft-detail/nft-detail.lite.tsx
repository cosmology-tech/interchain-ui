import { For, Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import Button from "../button";
import IconButton from "../icon-button";
import NftTraitListItem from "../nft-trait-list-item";
import NftTraitList from "../nft-trait-list";
import starIcon from "../../assets/stars.png";
import { store } from "../../models/store";
import NftDetailInfo from "../nft-detail-info";
import NftDetailTopOffer from "../nft-detail-top-offers";
import NftDetailActivityList from "../nft-detail-activity-list";

import * as styles from "./nft-detail.css";
import { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import { NftDetailProps, DetailType } from "./nft-detail.types";

export default function NftDetail(props: NftDetailProps) {
  return (
    <Stack className={styles.nftDetail} direction="column">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "12" }}>
        NFT Detail
      </Text>
      <Stack space="10">
        <Box flex={1}>
          <Box
            as="img"
            width="full"
            height="auto"
            borderRadius="md"
            attributes={{
              src: "https://res.cloudinary.com/stargaze/image/upload/w_512/e0445qpobuya6okuk1uw.jpg",
            }}
          />
        </Box>
        <Box flex={1}>
          <Stack direction="column">
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
            <Stack align="center" attributes={{ marginBottom: "7" }}>
              <Text color="textSecondary" attributes={{ marginRight: "3" }}>
                Created by
              </Text>
              <Text weight="semibold">{props?.creatorName}</Text>
            </Stack>
            <Text color="textSecondary" attributes={{ marginBottom: "7" }}>
              {props?.collectionDesc}
            </Text>
            <Stack align="center" attributes={{ marginBottom: "4" }}>
              <Text color="textSecondary" attributes={{ marginRight: "3" }}>
                Minted for
              </Text>
              <Text>{`${props?.mintPrice} STARS`}</Text>
              <Box
                as="img"
                attributes={{ src: starIcon }}
                marginLeft="3"
                width="8"
                height="8"
              />
            </Stack>
            <Stack align="center" attributes={{ marginBottom: "12" }}>
              <Text color="textSecondary" attributes={{ marginRight: "3" }}>
                Owned by
              </Text>
              <Text weight="semibold">{props?.ownerName}</Text>
            </Stack>
            <Show when={props.type === DetailType.listForSale}>
              <Button
                size="lg"
                intent="tertiary"
                leftIcon="priceTagLine"
                attributes={{ marginBottom: "8" }}
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
            <Show when={props?.type === DetailType.makeOffer}>
              <Button intent="tertiary" size="lg" leftIcon="coinsLine">
                Make Offer
              </Button>
            </Show>
            <Show when={props?.type === DetailType.buyNow}>
              <Stack space="8">
                <Button intent="tertiary" size="lg" leftIcon="shoppingBagLine">
                  Buy Now
                </Button>
                <Button intent="text" size="lg" leftIcon="coinsLine">
                  Make Offer
                </Button>
              </Stack>
            </Show>
          </Stack>
        </Box>
      </Stack>
      <Stack align="center" attributes={{ marginTop: "6", marginBottom: "5" }}>
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
      <Show when={props?.type === DetailType.makeOffer}>
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
    </Stack>
  );
}
