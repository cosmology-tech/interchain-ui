import { ReactNode } from "react";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";

type Value = {
  value: string;
  valueAsNumber: number;
};

type FocusChangeValue = {
  focused: boolean;
} & Value;

export interface NumberInputProps {
  id?: string;
  /**
   * Whether the number input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the number input is readonly
   */
  readOnly?: boolean;
  /**
   * The value of the input
   */
  value: string;
  /**
   * The minimum value of the number input
   */
  min?: number;
  /**
   * The maximum value of the number input
   */
  max?: number;
  /**
   * The amount to increment or decrement the value by
   */
  step?: number;
  /**
   * Function invoked when the value changes
   */
  onChange?: (details: Value) => void;
  /**
   * Function invoked when the number input is focused
   */
  onFocus?: (details: FocusChangeValue) => void;
  textAlign?: Sprinkles["textAlign"];
  fontSize?: Sprinkles["fontSize"];
  size?: "sm" | "md";
  placeholder?: string | undefined;
  intent?: "default" | "error";
  className?: string;
  inputContainer?: string;
  inputClassName?: string;
  label?: string;
  borderless?: boolean;
  startAddon?: ReactNode;
  endAddon?: ReactNode;
  name?: string;
  precision?: number;
  canDecrese?: boolean;
  canIncrease?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}
