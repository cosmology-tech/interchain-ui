import { ReactNode } from "react";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";
import type { AriaNumberFieldProps } from "react-aria";
import { TextFieldProps } from "@/ui/text-field/text-field.types";

export type NumberFieldSize = TextFieldProps["size"];
export type NumberFieldIntent = TextFieldProps["intent"];
export type NumberFieldTextAlignment = Sprinkles["textAlign"];

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
  clampValueOnBlur?: boolean;
  // ==== Form field props
  id?: string;
  isDisabled?: boolean;
  disabled?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  formatOptions?: AriaNumberFieldProps["formatOptions"];
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
  onInput?: AriaNumberFieldProps["onInput"];
  onBlur?: AriaNumberFieldProps["onBlur"];
  onFocus?: AriaNumberFieldProps["onFocus"];
  onFocusChange?: (isFocused: boolean) => void;
  onKeyDown?: AriaNumberFieldProps["onKeyDown"];
  onKeyUp?: AriaNumberFieldProps["onKeyUp"];
  // ==== Style props
  textAlign?: NumberFieldTextAlignment;
  fontSize?: Sprinkles["fontSize"];
  attributes?: Sprinkles & React.HTMLAttributes<HTMLDivElement>;
  size?: NumberFieldSize;
  placeholder?: string | undefined;
  intent?: NumberFieldIntent;
  className?: string;
  inputContainer?: string;
  inputClassName?: string;
  borderless?: boolean;
  addonDivider?: boolean;
}
