import type { BaseComponentProps } from "../../models/components.model";

export type ComboboxListItemType = {
  iconUrl?: string;
  name: string;
  tokenName: string;
  amount?: string;
  notionalValue?: string;
};

export type ComboboxListType = Array<ComboboxListItemType>;

export type AvailableItem = {
  imgSrc: string;
  symbol: string;
  name: string;
  denom?: string;
  /**
   * Available amount
   */
  available?: number;
  /**
   * Dollar price for per token
   */
  priceDisplayAmount?: number;
};

export interface TransferItemProps extends BaseComponentProps {
  /**
   * Drop down list of available items
   */
  dropdownList: AvailableItem[];
  /**
   * If show the available amount
   */
  hasAvailable?: boolean;
  availableLabel?: string;
  /**
   * Is there a half button
   */
  halfBtn?: boolean;
  halfBtnLabel?: string;
  /**
   * Is there a max button
   */
  maxBtn?: boolean;
  maxBtnLabel?: string;
  /**
   * Title of the transfer-item
   */
  title?: string;
  onChange?: (item: AvailableItem, value: number) => void;
  onInput?: (item: AvailableItem, rawValue: string) => void;
  /**
   * Disabled status of input
   */
  disabled?: boolean;
  /**
   * Callback when value changed of dropdown
   * @param selectItem
   * @returns
   */
  onItemSelected?: (selectItem: AvailableItem) => void;
  selectedItem: AvailableItem;
  defaultSelectedItem?: AvailableItem;
  amount?: number;
  defaultAmountPrice?: string;
  availableAsMax?: boolean;
  // Use the super tight spacing version for use as a widget
  isSmall?: boolean;
}
