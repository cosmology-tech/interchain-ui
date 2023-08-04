import {
  AvailableItem,
  TransferItemProps,
} from "../transfer-item/transfer-item.types";
import { SwapPriceProps } from "../swap-price/swap-price.types";

export interface SwapItemProps extends TransferItemProps {}

export interface SwapTokenProps {
  swapPrice: SwapPriceProps;
  /**
   * Drop down list of available items
   */
  dropDownList: Array<AvailableItem>;
  onSwap: () => void;
}
