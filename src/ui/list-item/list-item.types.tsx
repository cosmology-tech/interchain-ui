import { BaseComponentProps } from "../../models/components.model";
import { Sprinkles } from "../../styles/sprinkles.css";

export interface ListItemProps extends BaseComponentProps {
  isActive?: boolean;
  size?: "sm" | "md";
  attributes?: any;
  sprinkles?: Sprinkles;
  itemRef?: any;
}
