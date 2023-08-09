import { AvailableItem } from "../transfer-item/transfer-item.types";

export interface AssetListHeaderProps {
  /**
   * Sinlge chain or cross chain
   */
  isSingle?: boolean;
  /**
   * Total on Osmosis
   */
  total: string;
  /**
   * Total across all chains
   */
  totalOnAll?: string;
  dropDownList?: Array<AvailableItem>;
  /**
   * Callback of deposit
   * @param transferDetail
   * @returns
   */
  onDeposit?: (transferItem: AvailableItem, value: string) => void;
  onDepositCancel?: () => void;
  /**
   * Callback of withdraw
   * @param transferDetail
   * @returns
   */
  onWithdraw?: (transferItem: AvailableItem, value: string) => void;
  onWithdrawCancel?: () => void;
}
