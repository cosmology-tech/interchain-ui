import { AvailableItem } from "../transfer-item/transfer-item.types";
export interface TokenInputProps {
  progress?: number;
  amount?: string;
  symbol: AvailableItem["symbol"];
  denom?: AvailableItem["denom"];
  available?: AvailableItem["available"];
  priceDisplayAmount: AvailableItem["priceDisplayAmount"];
  imgSrc: AvailableItem["imgSrc"];
  title?: string | undefined;
  hasProgressBar?: boolean;
  availableAsMax?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: string) => void;
}
