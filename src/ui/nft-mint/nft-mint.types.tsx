export interface NftMintProps {
  tag: string;
  name: string;
  description: string;
  quantity: number | string;
  royalties: number | string;
  minted: number | string;
  available: number | string;
  priceDisplayAmount: number | string;
  limited: number | string;
  imgSrc: string;
  starsPrice: number | string;
  onChange?: (value: string) => void;
  onMint: () => void;
}
