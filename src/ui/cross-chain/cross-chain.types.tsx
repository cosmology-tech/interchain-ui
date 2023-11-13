import { AssetListHeaderProps } from "../asset-list-header/asset-list-header.types";
import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export type CrossChainHeaderProps = Omit<AssetListHeaderProps, "isSingle">;

export type CrossChainListItemProps = Omit<AssetListItemProps, "isOtherChains">;

export interface CrossChainProps {
  header: CrossChainHeaderProps;
  list: Array<CrossChainListItemProps>;
  otherList: Array<CrossChainListItemProps>;
}
