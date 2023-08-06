import {
  AvailableItem,
} from "../transfer-item/transfer-item.types";

export type TransferType = "withdraw" | "deposit";

export interface OverviewTransferProps {
  /**
   * Tranfer type
   */
  type: TransferType;
  /**
   * Drop down list of available items
   */
  dropDownList: AvailableItem[];
  /**
   * Callback of transfer button
   */
  onTransfer: (transferItem: AvailableItem, value: string) => void;
  onCancel: () => void;
}
