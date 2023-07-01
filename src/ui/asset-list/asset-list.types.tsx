import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";
export interface AssetListProps {
  isOtherChains: boolean;
  needChainSpace: boolean;
  list: AssetListItemProps[];
}
