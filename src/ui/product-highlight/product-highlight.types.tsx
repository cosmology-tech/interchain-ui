import { LabelProps } from "../label/label.types";
import { background } from "./product-highlight.css";

interface PictureConfig {
  width: string;
  height: string;
  top: string | number;
  right: string | number;
}

export interface ProductHighlightProps {
  title: string;
  label: LabelProps;
  description: string;
  onButtonClick: (event?: any) => void;
  bgVariant?: keyof typeof background;
  width?: string;
  height?: string;
  picture?: string;
  buttonText?: string;
  pictureConfig?: Partial<PictureConfig>;
}
