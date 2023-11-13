import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface NftProfileCardProps extends BaseComponentProps {
  width?: Sprinkles["width"];
  imgSrc: string;
  name: string;
  highestOffer: string;
  listPrice: string;
  onClick?: (event?: any) => void;
  attributes?: any;
}
