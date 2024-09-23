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
  buttonRef?: any;
  attributes?: Sprinkles;
  domAttributes?: any;
  isLoading?: boolean;
  spinnerPlacement?: "start" | "end";
  // Common DOM events with 'any' type for event parameters
  onClick?: (event: any) => void;
  onDoubleClick?: (event: any) => void;
  onMouseDown?: (event: any) => void;
  onMouseUp?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  onMouseMove?: (event: any) => void;
  onMouseOver?: (event: any) => void;
  onMouseOut?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onInput?: (event: any) => void;
  onChange?: (event: any) => void;
  onSubmit?: (event: any) => void;
  onReset?: (event: any) => void;
  onScroll?: (event: any) => void;
  onWheel?: (event: any) => void;
  onDragStart?: (event: any) => void;
  onDrag?: (event: any) => void;
  onDragEnd?: (event: any) => void;
  onDragEnter?: (event: any) => void;
  onDragLeave?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDrop?: (event: any) => void;
  onTouchStart?: (event: any) => void;
  onTouchMove?: (event: any) => void;
  onTouchEnd?: (event: any) => void;
  onTouchCancel?: (event: any) => void;
}
