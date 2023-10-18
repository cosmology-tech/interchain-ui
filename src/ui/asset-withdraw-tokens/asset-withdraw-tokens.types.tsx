import type { BaseComponentProps } from "../../models/components.model";
import type { AvailableItem } from "../transfer-item/transfer-item.types";

export interface AssetWithdrawTokensProps extends BaseComponentProps {
  isDropdown?: boolean;
  fromSymbol: AvailableItem["symbol"];
  fromDenom: AvailableItem["denom"];
  fromAddress: string;
  fromImgSrc: AvailableItem["imgSrc"];
  toDenom: AvailableItem["denom"];
  toAddress: string;
  toImgSrc: AvailableItem["imgSrc"];
  available: AvailableItem["available"];
  priceDisplayAmount: AvailableItem["priceDisplayAmount"];
  amount?: string;
  onChange?: (value: string) => void;
  onTransfer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  onAddressChange?: (value: string) => void;
  onAddressConfirm?: (event?: any) => void;
}
