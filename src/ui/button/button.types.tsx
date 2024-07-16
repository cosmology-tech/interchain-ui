import { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { IconProps } from "../icon/icon.types";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "unstyled";
export type ButtonIntent = "none" | "warning" | "success" | "danger";

export interface ButtonProps extends BaseComponentProps {
  as?: "button" | "a";
  href?: string;
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  disabled?: boolean;
  fluidWidth?: boolean;
  fluid?: boolean;
  iconSize?: IconProps["size"];
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
  onClick?: (event: any) => void;
  onHoverStart?: (event: any) => void;
  onHoverEnd?: (event: any) => void;
  buttonRef?: any;
  attributes?: Sprinkles;
  domAttributes?: any;
  isLoading?: boolean;
  spinnerPlacement?: "start" | "end";
}
