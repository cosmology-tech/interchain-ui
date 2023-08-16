
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
  onDeposit?: () => void;
  onWithdraw?: () => void;
}
