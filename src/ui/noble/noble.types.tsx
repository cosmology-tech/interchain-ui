import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";
import type { ButtonProps } from "../button/button.types";

export interface NobleProviderProps extends BaseComponentProps {}

export interface NobleTxDirectionCardProps extends BaseComponentProps {
  direction: string;
  chainName: string;
  address: string;
  logoUrl: string;
  addressDisplayLength?: number;
}

export interface NobleTxProgressBarProps extends BaseComponentProps {
  progress: number;
  width?: BoxProps["width"];
  mx?: BoxProps["mx"];
  mt?: BoxProps["mt"];
  mb?: BoxProps["mb"];
}

export interface NobleTxStepItemProps extends BaseComponentProps {
  step: string;
  status: "completed" | "processing" | "pending";
}

type BaseButtonProps = Omit<
  ButtonProps,
  "variant" | "intent" | "size" | "isLoading" | "spinnerPlacement"
>;

export type NobleButtonVariant = "text" | "solid";
export type NobleButtonSize = "sm" | "lg";

export interface NobleButtonProps extends BaseButtonProps {
  color?: BoxProps["color"];
  width?: BoxProps["width"];
  height?: BoxProps["height"];
  variant?: NobleButtonVariant;
  size?: NobleButtonSize;
  fontSize?: BoxProps["fontSize"];
  fontWeight?: BoxProps["fontWeight"];
  lineHeight?: BoxProps["lineHeight"];
}

export type NobleTxStatus = "processing" | "successful";

export interface NobleTxHistoryOverviewItemProps {
  amount: string;
  status: NobleTxStatus;
  sourceChainLogoSrc: string;
  destinationChainLogoSrc: string;
  mainLogoSrc?: string;
  amountUnit?: string;
  isExpanded?: boolean;
  customStatus?: {
    text: string;
    color: BoxProps["color"];
  };
}
