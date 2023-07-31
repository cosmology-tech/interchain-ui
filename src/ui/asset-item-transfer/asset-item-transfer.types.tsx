import { TransferType } from "../overview-transfer/overview-transfer.types";

export interface AssetItemTransferProps {
  /**
   * Transfer type
   */
  type: TransferType;
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
  onTransfer?: (amountValue: string) => void;
  onCancel?: () => void;
}
