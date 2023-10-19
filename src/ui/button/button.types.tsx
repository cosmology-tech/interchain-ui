import { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { IconProps } from "../icon/icon.types";
import type { ButtonVariant, ButtonIntent, ButtonSize } from "./button.helper";

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  disabled?: boolean;
  iconSize?: IconProps["size"];
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
  onClick?: (event: any) => void;
  onHoverStart?: (event: any) => void;
  onHoverEnd?: (event: any) => void;
  ref?: any;
  attributes?: Sprinkles;
  domAttributes?: any;
  isLoading?: boolean;
  spinnerPlacement?: "start" | "end";
}
