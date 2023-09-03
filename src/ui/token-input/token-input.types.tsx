import { BoxProps } from "../box/box.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";
import { ClassValue } from "clsx";
export interface TokenInputProps {
  attributes?: BoxProps["attributes"]
  progress?: number;
  amount?: string;
  symbol?: AvailableItem["symbol"];
  denom?: AvailableItem["denom"];
  available?: AvailableItem["available"];
  priceDisplayAmount?: AvailableItem["priceDisplayAmount"];
  imgSrc: AvailableItem["imgSrc"];
  title?: string | undefined;
  hasProgressBar?: boolean;
  availableAsMax?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: string) => void;
  onFocus?: (e: any) => void;
  inputClass?: ClassValue;
  imgClass?: ClassValue;
}
