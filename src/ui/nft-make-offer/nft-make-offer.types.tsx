export interface NftMakeOfferProps {
  imgSrc: string;
  tokenName: string;
  onChange?: (value: string) => void;
  onMakeOffer?:() => void;
  onCancel?: () => void;
  value?: string;
}
