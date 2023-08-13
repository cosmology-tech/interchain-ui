import { PoolListItemProps } from "../pool-list-item/pool-list-item.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";

export interface onAddLiquidityItem extends AvailableItem {
  addAmount: string;
}

export type ResponseType = "success" | "failed";

export interface ResponseInfo {
  type: ResponseType;
  title: string;
  message?: string;
}

export interface AddLiquidityProps {
  poolAssets: PoolListItemProps["poolAssets"];
  onAddLiquidity: (assets: onAddLiquidityItem[]) => ResponseInfo;
  onClose?: () => void
}
