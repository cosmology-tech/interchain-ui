import type {
  Children,
  BaseComponentProps,
} from "../../models/components.model";
import type { FieldLabelProps } from "../field-label/field-label.types";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

// You can render a text field as either an input or a textarea.
export type TextFieldElementType = "input" | "textarea";

export type FieldLabelVariant =
  | {
      "aria-labelledby": string;
    }
  | {
      "aria-label": string;
    }
  | {
      label: FieldLabelProps["label"];
    };

export type FieldBaseProps = {
  id: string;
  value?: any;
  labelId?: string;
  name?: string | undefined;
  disabled?: boolean;
  readonly?: boolean;
  autoComplete?: string | undefined;
  description?: string | undefined;
  message?: Children;
  "aria-describedby"?: string | undefined;
  data?: any;
  autoFocus?: boolean;
  prefix?: string;
  required?: boolean;
};

export type PassthroughProps =
  | "id"
  | "name"
  | "disabled"
  | "autoComplete"
  | "autoFocus";

export interface FieldRenderProps
  extends Pick<FieldBaseProps, PassthroughProps> {
  background: Sprinkles["backgroundColor"];
  borderRadius: Sprinkles["borderRadius"];
  width: Sprinkles["width"];
  paddingLeft: Sprinkles["paddingLeft"];
  paddingRight: Sprinkles["paddingRight"];
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className: string;
}

export type PrivateFieldProps = FieldBaseProps & FieldLabelVariant;

export const validTypes = {
  text: "text",
  password: "password",
  email: "email",
  search: "search",
  number: "number",
  tel: "tel",
  url: "url",
};

type InputMode = "text" | "email" | "search" | "numeric" | "tel" | "url";

export const defaultInputModesForType: Record<
  keyof typeof validTypes,
  InputMode
> = {
  text: "text",
  password: "text",
  email: "email",
  search: "search",
  number: "numeric",
  tel: "tel",
  url: "url",
};

export type TextFieldSize = "sm" | "md";
export type TextFieldIntent = "none" | "error";

type TextareaSpecificProps = {
  rows?: number;
  cols?: number;
  wrap?: "soft" | "hard";
  resize?: "none" | "both" | "horizontal" | "vertical";
};

export type BaselineProps = BaseComponentProps & FieldBaseProps;

export type CommonInputProps = {
  value: string;
  type?: keyof typeof validTypes;
  inputMode?: InputMode;
  intent?: TextFieldIntent;
  onChange?: (e: any) => void;
  onBlur?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  onClear?: (event?: any) => void;
  size?: TextFieldSize;
  placeholder?: string | undefined;
  label?: Children | undefined;
  clearLabel?: string;
  attributes?: any;
  inputAttributes?: any;
  startAddon?: Children | undefined;
  endAddon?: Children | undefined;
  inputContainer?: string;
  inputClassName?: string;
  as?: TextFieldElementType;
};

export type RenderAsInputProps = BaselineProps & CommonInputProps;
export type RenderAsTextareaProps = BaselineProps &
  CommonInputProps &
  TextareaSpecificProps;

export type TextFieldProps = RenderAsInputProps | RenderAsTextareaProps;
