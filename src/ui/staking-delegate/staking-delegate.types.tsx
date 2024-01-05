import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type DelegationItem = {
  label: string;
  tokenAmount: string;
  tokenName: string;
  isLoading?: boolean;
};

export type InputPartialChange = {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
};

export type FormatOptions = {
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};

export interface StakingDelegateProps extends BaseComponentProps {
  header?: {
    title?: string;
    subtitle?: string;
    avatarUrl?: string;
  };
  headerExtra?: BaseComponentProps["children"];
  delegationItems?: DelegationItem[];
  footer?: BaseComponentProps["children"];
  inputToken?: {
    tokenName: string;
    tokenIconUrl: string;
  };
  inputValue?: number;
  inputNotionalValue?: number;
  onValueChange?: (value: number) => void;
  onValueInput?: (rawValue: string) => void;
  inputPartials?: InputPartialChange[];
  inputMaxValue?: number;
  inputMinValue?: number;
  isLoadingNotionalValue?: boolean;
  formatOptions?: FormatOptions;
  attributes?: Omit<
    BoxProps,
    "attributes" | "as" | "className" | "children" | "style" | "ref"
  >;
}
