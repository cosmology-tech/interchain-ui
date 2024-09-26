import { SelectButtonIntent, SelectButtonSize } from "./select-button.types";
import { createVar } from "@vanilla-extract/css";
import { StringifyValues } from "../../helpers/types";

export const selectButtonVarPrefix = "SelectButton" as const;
export const selectButtonSizes: SelectButtonSize[] = ["sm", "md"] as const;
export const selectButtonIntents: SelectButtonIntent[] = [
  "none",
  "error",
] as const;
const selectButtonStates = [
  "default",
  "hovered",
  "focused",
  "disabled",
] as const;

export type SelectButtonState = (typeof selectButtonStates)[number];

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

export type SelectButtonIntentProperties = StringifyValues<typeof intentProps>;
export type SelectButtonSizeProperties = StringifyValues<typeof sizeProps>;

export type SelectButtonIntentProperty = keyof SelectButtonIntentProperties;
export type SelectButtonSizeProperty = keyof SelectButtonSizeProperties;

export type SelectButtonIntentScheme = Partial<
  Record<SelectButtonIntent, Partial<SelectButtonIntentProperties>>
>;
export type SelectButtonSizeScheme = Partial<
  Record<SelectButtonSize, Partial<SelectButtonSizeProperties>>
>;

export type SelectButtonVarKeys =
  | `${typeof selectButtonVarPrefix}-${SelectButtonIntent}-${SelectButtonIntentProperty}`
  | `${typeof selectButtonVarPrefix}-${SelectButtonSize}-${SelectButtonSizeProperty}`;

export type SelectButtonVars = {
  [K in SelectButtonVarKeys]: string;
};

export function generateSelectButtonVars() {
  const vars = {} as SelectButtonVars;

  selectButtonIntents.forEach((intent) => {
    Object.keys(intentProps).forEach((prop) => {
      const key =
        `SelectButton-${intent}-${prop as SelectButtonIntentProperty}` satisfies SelectButtonVarKeys;
      vars[key] = createVar();
    });
  });

  selectButtonSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key =
        `SelectButton-${size}-${prop as SelectButtonSizeProperty}` satisfies SelectButtonVarKeys;
      vars[key] = createVar();
    });
  });

  return vars;
}
