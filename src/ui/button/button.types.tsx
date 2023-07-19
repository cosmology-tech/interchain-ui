import { BaseComponentProps, BaseState } from "../../models/components.model";
import type { Variants } from "./button.css";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { IconProps } from "../icon/icon.types";
import type { ThemeVariant } from "../../models/system.model";

export interface ButtonProps extends BaseComponentProps {
  variant?: Variants["variant"];
  intent?: Variants["intent"];
  size?: Variants["size"];
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
}
