type AvailableItem = {
  imgSrc: string;
  symbol: string;
  denom: string;
  available: string;
}

type TransferDetail = AvailableItem & {value: string}

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
  /**
   * Has withdraw button
   */
  canWithdraw?: boolean;
  /**
   * Has deposit button
   */
  canDeposit?: boolean;
  /**
   * Drop down list of available items
   */
  dropDownList: AvailableItem[];
  /**
   * Callback of deposit
   * @param transferDetail
   * @returns
   */
  onDeposit?: (transferDetail: TransferDetail) => void;
  onDepositCancel: () => void;
  /**
   * Callback of withdraw
   * @param transferDetail
   * @returns
   */
  onWithDraw?: (transferDetail: TransferDetail) => void;
  onWithdrawCancel: () => void;
}
