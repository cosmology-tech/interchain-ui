import { ReactNode } from "react";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";
import type { AriaNumberFieldProps } from "react-aria";

export interface NumberInputProps {
  // ==== Core logic props
  defaultValue?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
  incrementButton?: ReactNode;
  decrementButton?: ReactNode;
  canIncrement?: boolean;
  canDecrement?: boolean;
  // ==== Form field props
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  formatOptions?: AriaNumberFieldProps["formatOptions"];
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
  onBlur?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  onFocusChange?: (isFocused: boolean) => void;
  onKeyDown?: (e?: any) => void;
  onKeyUp?: (e?: any) => void;
  // ==== Style props
  textAlign?: Sprinkles["textAlign"];
  fontSize?: Sprinkles["fontSize"];
  size?: "sm" | "md";
  placeholder?: string | undefined;
  intent?: "default" | "error";
  className?: string;
  inputContainer?: string;
  inputClassName?: string;
  borderless?: boolean;
}
