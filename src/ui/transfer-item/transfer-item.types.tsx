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
  denom: string;
  /**
   * Available amount
   */
  available?: number;
  /**
   * Dollar price for per token
   */
  priceDisplayAmount?: number;
};

export interface TransferItemProps {
  /**
   * Drop down list of available items
   */
  dropDownList: AvailableItem[];
  /**
   * If show the available amount
   */
  hasAvailable?: boolean;
  /**
   * Is there a half button
   */
  halfBtn?: boolean;
  /**
   * Is there a max button
   */
  maxBtn?: boolean;
  /**
   * Title of the transfer-item
   */
  title?: string;
  onChange?: (item: AvailableItem, value: number) => void;
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
  amount?: number;
  defaultAmountPrice?: string;
  availableAsMax?: boolean;
}
