import { BaseComponentProps, BaseState } from "../../models/components.model";
import type { Variants } from "./button.css";
import type { IconProps } from "../icon/icon.types";

export interface ButtonProps extends BaseComponentProps, Variants {
  disabled?: boolean;
  /**
   * Icon of button's left side========
   */
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
}

export interface ButtonState extends BaseState {}
