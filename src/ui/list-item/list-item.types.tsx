import { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type ListItemSize = "sm" | "md";

export interface ListItemProps extends BaseComponentProps {
  isSelected?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  size?: ListItemSize;
  as?: any;
  attributes?: any;
  _css?: Sprinkles;
  itemRef?: any;
}
