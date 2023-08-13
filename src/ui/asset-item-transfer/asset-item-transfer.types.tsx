import { TransferType } from "../overview-transfer/overview-transfer.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";
type AssetItemTransferDetail = {
  value: string;
  type: TransferType;
};
export interface AssetItemTransferProps {
  type?: TransferType;
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
  onTransfer?: (detail: AssetItemTransferDetail) => void;
  onCancel?: () => void;
}
