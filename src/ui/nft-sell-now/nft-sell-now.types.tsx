import { NftFeesProps } from "../nft-fees/nft-fees.types";
export interface NftSellNowProps {
  bestOffer: number;
  offerToFloorPriceRatio: string;
  floorPrice: number;
  fees: NftFeesProps;
  onList?: () => void;
  onCancel?: () => void;
}
