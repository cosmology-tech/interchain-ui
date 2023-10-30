import { NftFeesProps } from "../nft-fees/nft-fees.types";

export interface NftMinimumOfferProps {
  floorPrice: number;
  highestOffer: number;
  onList?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  onChange?: (value: number) => void;
  value?: number;
  fees: NftFeesProps;
}
