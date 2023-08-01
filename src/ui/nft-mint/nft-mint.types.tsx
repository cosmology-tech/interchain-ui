export interface NftMintProps {
  tag: string;
  name: string;
  description: string;
  quantity: number;
  royalties: number;
  minted: number;
  available: number;
  priceDisplayAmount: number;
  limited: number;
  imgSrc: string;
  starsPrice: number;
}
