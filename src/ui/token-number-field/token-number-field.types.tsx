import type { Children } from "../../models/components.model";

type Value = {
  value: string;
  valueAsNumber: number;
};

export interface TokenNumberFieldProps {
  id?: string;
  available: string | number;
  disabled?: boolean;
  value: number;
  /**
   * Function invoked when the value changes
   */
  onChange?: (value: number) => void;
  /**
   * Function invoked when the number input is focused
   */
  onFocus?: (
    details: Value & {
      srcElement: HTMLElement | null;
    }
  ) => void;
  /**
   * The value of the input when it is blurred
   */
  onBlur?: (details: Value) => void;
  inputContainer?: string;
  inputClassName?: string;
  className?: string;
  borderless?: boolean;
  decrementButton?: Children;
  incrementButton?: Children;
}
