import { BoxProps } from "../box/box.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";
import { ClassValue } from "clsx";
import type { IconName } from "../icon/icon.types";
import type { LiteralUnion } from "type-fest";

export interface TokenInputProps {
  attributes?: BoxProps["attributes"];
  progress?: number;
  amount?: number;
  symbol?: AvailableItem["symbol"];
  name?: AvailableItem["name"];
  available?: AvailableItem["available"];
  priceDisplayAmount?: AvailableItem["priceDisplayAmount"];
  tokenIcon?: LiteralUnion<IconName, string>;
  title?: string | undefined;
  hasProgressBar?: boolean;
  availableAsMax?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: number) => void;
  onFocus?: (e?: any) => void;
  inputClass?: ClassValue;
  imgClass?: ClassValue;
}
