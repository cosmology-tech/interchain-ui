import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";
import type { ButtonProps } from "../button/button.types";

export interface MeshStakingProps extends BaseComponentProps {}

export interface MeshButtonProps
  extends Omit<
    ButtonProps,
    | "variant"
    | "intent"
    | "size"
    | "iconSize"
    | "leftIcon"
    | "rightIcon"
    | "isLoading"
    | "spinnerPlacement"
  > {
  width?: BoxProps["width"];
}

export interface MeshTagButtonProps
  extends Omit<
    ButtonProps,
    | "variant"
    | "intent"
    | "size"
    | "iconSize"
    | "leftIcon"
    | "rightIcon"
    | "isLoading"
    | "spinnerPlacement"
  > {}

export interface MeshStakingSliderInfoProps extends BaseComponentProps {
  tokenName: string;
  tokenSymbol: string;
  tokenImgSrc: string;
  tokenAPR: string;
  isActive?: boolean;
}

export interface MeshFooterInfoItemProps extends BaseComponentProps {
  title: string;
  description: string;
  subDescription?: string;
}
