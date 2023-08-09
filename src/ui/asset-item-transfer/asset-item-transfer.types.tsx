import { TransferType } from "../overview-transfer/overview-transfer.types";
type AssetItemTransferDetail = {
  value: string;
  type: TransferType;
};
export interface AssetItemTransferProps {
  type?: TransferType;
  fromSymbol: string;
  fromDenom: string;
  fromAddress: string;
  fromImgSrc: string;
  toDenom: string;
  toAddress: string;
  toImgSrc: string;
  avaliable: string | number;
  priceDisplayAmount: number;
  amount?: string;
  onTransfer?: (detail: AssetItemTransferDetail) => void;
  onCancel?: () => void;
}
