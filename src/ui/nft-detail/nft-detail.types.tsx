import { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import { NftDetailInfoProps } from "../nft-detail-info/nft-detail-info.type";
import { NftDetailTopOfferProps } from "../nft-detail-top-offers/nft-detail-top-offers.types";
import { NftDetailActivityListProps } from "../nft-detail-activity-list/nft-detail-activity-list.types";

export type DetailType = "listForSale" | "makeOffer" | "buyNow";
interface BaseNftDetailProps {
  collectionName: string;
  tokenName: string;
  creatorName: string;
  collectionDesc: string;
  mintPrice: string;
  rarityOrder: number;
  tokensCount: number;
  ownerName: string;
}

export type NftDetailProps = (
  | {
      type: "listForSale";
      traits: NftTraitListItemProps[];
    }
  | {
      type: "makeOffer";
      traits: NftTraitListItemProps[];
    }
  | {
      type: "buyNow";
      traits: NftTraitListItemProps[];
      detailInfo?: NftDetailInfoProps;
      detailTopOffer?: NftDetailTopOfferProps;
      detailActivity?: NftDetailActivityListProps;
    }
) &
  BaseNftDetailProps;
