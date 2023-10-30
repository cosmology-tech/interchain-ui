export interface NftMakeOfferProps {
  imgSrc: string;
  tokenName: string;
  onChange?: (value: number) => void;
  onMakeOffer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  value?: number;
}
