import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { TextFieldProps } from "../text-field/text-field.types";

export interface ChangeChainInputProps
  extends Omit<
    TextFieldProps,
    | "id"
    | "inputContainer"
    | "inputClassName"
    | "startAddon"
    | "endAddon"
    | "clearLabel"
  > {
  size?: TextFieldProps["size"];
  attributes?: any;
  sprinkles?: Sprinkles;
  containerRef?: any;
  inputAttributes?: any;
  // ====
  id?: string;
  iconUrl?: string;
  chainName?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  onClear?: () => void;
  onDropdownArrowClicked?: () => void;
}
