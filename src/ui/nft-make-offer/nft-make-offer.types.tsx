export interface NftMakeOfferProps {
  imgSrc: string;
  tokenName: string;
  onChange?: (value: string) => void;
  onMakeOffer?:(event?: any) => void;
  onCancel?: (event?: any) => void;
  value?: string;
}
