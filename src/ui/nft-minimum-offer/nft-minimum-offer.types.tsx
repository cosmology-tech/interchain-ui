import { NftFeesProps } from "../nft-fees/nft-fees.types";
export interface NftMinimumOfferProps {
  floorPrice: number;
  highestOffer: number;
  onList?: () => void;
  onCancel?: () => void;
  onChange?: (value: string) => void
  value?:string;
  fees:NftFeesProps;
}
