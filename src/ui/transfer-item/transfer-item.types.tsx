export type AvailableItem = {
  imgSrc: string;
  symbol: string;
  denom: string;
  /**
   * Available amount
   */
  available: string;
  /**
   * Dollar price for per token
   */
  priceDisplayAmount: number;
};

export type TransferDetail = AvailableItem & { value: string };

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
  onChange?: (transferDetail: TransferDetail) => void;
}
