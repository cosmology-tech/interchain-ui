export interface TransferItemProps {
  symbol: string;
  denom: string;
  imgSrc: string;
  availableAmount: number;
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
}
