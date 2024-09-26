import { TextFieldIntent, TextFieldSize } from "./text-field.types";
import { createVar } from "@vanilla-extract/css";
import { StringifyValues } from "../../helpers/types";

export const textFieldVarPrefix = "TextField" as const;
export const textFieldSizes: TextFieldSize[] = ["sm", "md"] as const;
export const textFieldIntents: TextFieldIntent[] = ["none", "error"] as const;
const textFieldStates = ["default", "hovered", "focused", "disabled"] as const;

export type TextFieldState = (typeof textFieldStates)[number];

const intentProps = {
  // Default state
  bgColor: "",
  textColor: "",
  borderColor: "",
  borderWidth: "",
  borderRadius: "",
  placeholderColor: "",
  boxShadow: "",
  opacity: "",
  // Hover state
  hoverBgColor: "",
  hoverTextColor: "",
  hoverBorderColor: "",
  hoverBorderWidth: "",
  hoverBorderRadius: "",
  hoverPlaceholderColor: "",
  hoverBoxShadow: "",
  hoverOpacity: "",
  // Focused state
  focusedBgColor: "",
  focusedTextColor: "",
  focusedBorderColor: "",
  focusedBorderWidth: "",
  focusedBorderRadius: "",
  focusedPlaceholderColor: "",
  focusedBoxShadow: "",
  focusedOpacity: "",
  // Disabled state
  disabledBgColor: "",
  disabledTextColor: "",
  disabledBorderColor: "",
  disabledBorderWidth: "",
  disabledBorderRadius: "",
  disabledPlaceholderColor: "",
  disabledBoxShadow: "",
  disabledOpacity: "",
} as const;

const sizeProps = {
  fontSize: "",
  fontWeight: "",
  paddingX: "",
  paddingY: "",
  height: "",
  minWidth: "",
} as const;

export type TextFieldIntentProperties = StringifyValues<typeof intentProps>;
export type TextFieldSizeProperties = StringifyValues<typeof sizeProps>;

export type TextFieldIntentProperty = keyof TextFieldIntentProperties;
export type TextFieldSizeProperty = keyof TextFieldSizeProperties;

export type TextFieldIntentScheme = Partial<
  Record<TextFieldIntent, Partial<TextFieldIntentProperties>>
>;
export type TextFieldSizeScheme = Partial<
  Record<TextFieldSize, Partial<TextFieldSizeProperties>>
>;

export type TextFieldVarKeys =
  | `${typeof textFieldVarPrefix}-${TextFieldIntent}-${TextFieldIntentProperty}`
  | `${typeof textFieldVarPrefix}-${TextFieldSize}-${TextFieldSizeProperty}`;

export type TextFieldVars = {
  [K in TextFieldVarKeys]: string;
};

export function generateTextFieldVars() {
  const textFieldVars = {} as TextFieldVars;

  textFieldIntents.forEach((intent) => {
    Object.keys(intentProps).forEach((prop) => {
      const key =
        `TextField-${intent}-${prop as TextFieldIntentProperty}` satisfies TextFieldVarKeys;
      textFieldVars[key] = createVar();
    });
  });

  textFieldSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key =
        `TextField-${size}-${prop as TextFieldSizeProperty}` satisfies TextFieldVarKeys;
      textFieldVars[key] = createVar();
    });
  });

  return textFieldVars;
}
