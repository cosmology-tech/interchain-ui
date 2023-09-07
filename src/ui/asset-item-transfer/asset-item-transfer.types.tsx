import { AvailableItem } from "../transfer-item/transfer-item.types";
export interface AssetItemTransferProps {
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
