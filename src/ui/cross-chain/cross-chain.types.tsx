import { AssetListHeaderProps } from "../asset-list-header/asset-list-header.types";
import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";
export interface CrossChainProps {
  header: AssetListHeaderProps;
  list: AssetListItemProps[];
  otherList: AssetListItemProps[];
}
