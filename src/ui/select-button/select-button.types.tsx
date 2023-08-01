import type { TextFieldProps } from "../text-field/text-field.types";
import type { BaseComponentProps } from "../../models/components.model";

export interface SelectButtonProps extends BaseComponentProps {
  fieldId: string;
  placeholder?: string;
  disabled?: boolean;
  intent?: TextFieldProps["intent"];
  onClick?: () => void;
  size?: "sm" | "md";
  attributes?: any;
  buttonAttributes?: any;
  buttonRef?: any;
}
