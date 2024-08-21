import type { BaseComponentProps } from "../../models/components.model";
import type { ListItemProps } from "../list-item/list-item.types";

export interface ChainListItemProps extends BaseComponentProps {
  isActive?: ListItemProps["isActive"];
  isSelected?: ListItemProps["isSelected"];
  isDisabled?: ListItemProps["isDisabled"];
  size?: ListItemProps["size"];
  attributes?: ListItemProps["attributes"];
  _css?: ListItemProps["_css"];
  itemRef?: ListItemProps["itemRef"];
  // ==== Chain info props
  iconUrl?: string;
  name: string;
  tokenName: string;
  amount?: string;
  notionalValue?: string;
}
