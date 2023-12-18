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
  onClick: () => void;
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
  inputPartials?: InputPartialChange[];
  inputMaxValue?: number;
  inputMinValue?: number;
  attributes?: Omit<
    BoxProps,
    "attributes" | "as" | "className" | "children" | "style" | "ref"
  >;
}
