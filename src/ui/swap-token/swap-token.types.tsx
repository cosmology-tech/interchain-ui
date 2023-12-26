import type {
  AvailableItem,
  TransferItemProps,
} from "../transfer-item/transfer-item.types";
import type { BaseComponentProps } from "../../models/components.model";
import type { SwapPriceProps } from "../swap-price/swap-price.types";

export interface SwapItemProps extends TransferItemProps {}

export type SwapInfo = {
  fromItem: AvailableItem;
  toItem: AvailableItem;
  fromAmount: number;
  toAmount: number;
};

export type SwapItem = {
  label?: string;
  options: Array<AvailableItem>;
  selected: AvailableItem;
  amount: number;
  onItemSelected: (selectedItem: AvailableItem) => void;
  onAmountChange: (selectedItem: AvailableItem, amount: number) => void;
  onAmountInput?: (selectedItem: AvailableItem, rawValue: string) => void;
};

export interface SwapTokenProps extends BaseComponentProps {
  swapPrice: {
    hasRoute: SwapPriceProps["hasRoute"];
    priceImpact: SwapPriceProps["priceImpact"];
    swapFee: SwapPriceProps["swapFee"];
    // Route preview props
    routeDisabled?: boolean;
    minimumReceived?: number;
  };
  from: SwapItem;
  to: SwapItem;
  toleranceLimits?: Array<number>;
  onToggleDirection: () => void;
  onSwap: (event?: any) => void;
  onToleranceChange: (toterancePercent: number) => void;
  swapDisabled?: boolean;
  // Labels
  swapLabel?: string;
  swapDisabledLabel?: string;
  slippageLabel?: string;
}
