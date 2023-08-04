import { AvailableItem, TransferDetail } from "../transfer-item/transfer-item.types";

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
  onDeposit?: (transferDetail: TransferDetail) => void;
  onDepositCancel?: () => void;
  /**
   * Callback of withdraw
   * @param transferDetail
   * @returns
   */
  onWithdraw?: (transferDetail: TransferDetail) => void;
  onWithdrawCancel?: () => void;
}
