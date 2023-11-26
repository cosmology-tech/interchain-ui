import { AvailableItem } from "../transfer-item/transfer-item.types";

export type TransferType = "withdraw" | "deposit";

export interface OverviewTransferProps {
  dropdownList: AvailableItem[];
  selectedItem?: AvailableItem;
  defaultSelected?: AvailableItem;
  isSubmitDisabled?: boolean;
  fromChainLogoUrl: string;
  toChainLogoUrl: string;
  transferLabel?: string;
  cancelLabel?: string;
  timeEstimateLabel?: string;
  onTransfer: (event?: any) => void;
  onChange: (selectedItem: AvailableItem, value: number) => void;
  onCancel: (event?: any) => void;
}
