import { BaseComponentProps, BaseState } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { IconProps } from "../icon/icon.types";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";
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
  attributes?: Sprinkles;
  domAttributes?: any;
}

export interface ButtonState extends BaseState {
  theme: ThemeVariant;
  overrideManager: OverrideStyleManager | null;
}
