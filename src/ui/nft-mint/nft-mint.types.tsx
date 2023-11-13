import type { BaseComponentProps } from "../../models/components.model";

export interface NftMintProps extends BaseComponentProps {
  title: string;
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
  onChange?: (value: number) => void;
  onMint: (event?: any) => void;
}
