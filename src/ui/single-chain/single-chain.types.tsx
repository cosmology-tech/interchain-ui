import { AssetListHeaderProps } from "../asset-list-header/asset-list-header.types";
import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export type SingleChainHeaderProps = Omit<
  AssetListHeaderProps,
  "isSingle" | "totalOnAll"
>;

export type SingleChainListItemProps = Omit<
  AssetListItemProps,
  "isOtherChains"
>;

export interface SingleChainProps {
  header: SingleChainHeaderProps;
  list: Array<SingleChainListItemProps>;
}
