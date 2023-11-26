import {
  AvailableItem,
  TransferItemProps,
} from "../transfer-item/transfer-item.types";
import { SwapPriceProps } from "../swap-price/swap-price.types";

export interface SwapItemProps extends TransferItemProps {}

export type SwapInfo = {
  fromItem: AvailableItem;
  toItem: AvailableItem;
  fromAmount: number;
  toAmount: number;
};

export interface SwapTokenProps {
  swapPrice: {
    hasRoute: SwapPriceProps["hasRoute"];
    priceImpact: SwapPriceProps["priceImpact"];
    swapFee: SwapPriceProps["swapFee"];
  };
  /**
   * Drop down list of available items
   */
  dropdownList: Array<AvailableItem>;
  toleranceLimits?: Array<number>;
  onChange: (detail: SwapInfo) => void;
  onSwap: (event?: any) => void;
  onToleranceChange: (toterancePercent: number) => void;
}
