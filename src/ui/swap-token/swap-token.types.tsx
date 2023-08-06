import {
  AvailableItem,
  TransferItemProps,
} from "../transfer-item/transfer-item.types";
import { SwapPriceProps } from "../swap-price/swap-price.types";

export interface SwapItemProps extends TransferItemProps {}

export type SwapInfoType = {
  fromItem: AvailableItem;
  toItem: AvailableItem;
  fromAmount: string;
  toAmount: string;
  minimumReceived: string;
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
  dropDownList: Array<AvailableItem>;
  onSwap: (swapInfo: SwapInfoType) => void;
}
