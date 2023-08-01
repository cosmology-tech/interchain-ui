import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface ChainSwapInputProps extends BaseComponentProps {
  size?: "sm" | "md";
  attributes?: any;
  sprinkles?: Sprinkles;
  containerRef?: any;
  inputAttributes?: any;
  // ====
  value: string;
  placeholder?: string;
  label: string;
  iconUrl?: string;
  amount?: string;
  notionalValue?: string;
  onDropdownArrowClicked: () => void;
}
