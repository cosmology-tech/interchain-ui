import type { TextFieldProps } from "../text-field/text-field.types";
import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type SelectButtonSize = TextFieldProps["size"];
export type SelectButtonIntent = TextFieldProps["intent"];

export interface SelectButtonProps extends BaseComponentProps {
  placeholder?: string;
  disabled?: boolean;
  active?: boolean;
  intent?: SelectButtonIntent;
  onClick?: (event?: any) => void;
  size?: SelectButtonSize;
  attributes?: any;
  buttonAttributes?: any;
  buttonRef?: any;
  valueProps?: any;
  _css?: Sprinkles;
}
