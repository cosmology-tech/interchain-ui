import { ButtonIntent, ButtonSize, ButtonVariant } from "./button.types";
import { createVar } from "@vanilla-extract/css";
import { StringifyValues } from "../../helpers/types";

export const buttonVarPrefix = "Button" as const;
export const buttonSizes: ButtonSize[] = ["xs", "sm", "md", "lg"] as const;
export const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "unstyled",
] as const;
export const buttonIntents: ButtonIntent[] = [
  "none",
  "warning",
  "success",
  "danger",
] as const;
const buttonStates = [
  "default",
  "hovered",
  "pressed",
  "disabled",
  "focused",
] as const;

export type ButtonState = (typeof buttonStates)[number];

const intentProps = {
  // Default state
  bgColor: "",
  textColor: "",
  borderColor: "",
  // Hover state
  hoverBgColor: "",
  hoverTextColor: "",
  hoverBorderColor: "",
  // Active state
  activeBgColor: "",
  activeTextColor: "",
  activeBorderColor: "",
  // Disabled state
  disabledBgColor: "",
  disabledTextColor: "",
  disabledBorderColor: "",
} as const;

const variantProps = {
  // Default state
  bgColor: "",
  textColor: "",
  borderColor: "",
  borderStyle: "",
  borderRadius: "",
  borderWidth: "",
  boxShadow: "",
  // Hover state
  hoverBgColor: "",
  hoverTextColor: "",
  hoverBorderColor: "",
  hoverBorderRadius: "",
  hoverBorderWidth: "",
  // Active state
  activeBgColor: "",
  activeTextColor: "",
  activeBorderColor: "",
  activeBorderRadius: "",
  activeBorderWidth: "",
  // Disabled state
  disabledBgColor: "",
  disabledTextColor: "",
  disabledBorderColor: "",
  disabledBorderRadius: "",
  disabledBorderWidth: "",
} as const;

const sizeProps = {
  fontSize: "",
  fontWeight: "",
  paddingX: "",
  paddingY: "",
  height: "",
  minWidth: "",
} as const;

export type ButtonIntentProperties = StringifyValues<typeof intentProps>;
export type ButtonVariantProperties = StringifyValues<typeof variantProps>;
export type ButtonSizeProperties = StringifyValues<typeof sizeProps>;

export type ButtonIntentProperty = keyof ButtonIntentProperties;
export type ButtonVariantProperty = keyof ButtonVariantProperties;
export type ButtonSizeProperty = keyof ButtonSizeProperties;

export type ButtonColorScheme = Partial<
  Record<ButtonIntent, Partial<ButtonIntentProperties>>
>;
export type ButtonVariantScheme = Partial<
  Record<ButtonVariant, Partial<ButtonVariantProperties>>
>;
export type ButtonSizeScheme = Partial<
  Record<ButtonSize, Partial<ButtonSizeProperties>>
>;

export type ButtonVarKeys =
  | `${typeof buttonVarPrefix}-${ButtonIntent}-${ButtonIntentProperty}`
  | `${typeof buttonVarPrefix}-${ButtonVariant}-${ButtonVariantProperty}`
  | `${typeof buttonVarPrefix}-${ButtonSize}-${ButtonSizeProperty}`;

export type ButtonVars = {
  [K in ButtonVarKeys]: string;
};

export function generateButtonVars() {
  const buttonVars = {} as ButtonVars;

  buttonIntents.forEach((intent) => {
    Object.keys(intentProps).forEach((prop) => {
      const key =
        `${buttonVarPrefix}-${intent}-${prop as ButtonIntentProperty}` satisfies ButtonVarKeys;
      buttonVars[key] = createVar();
    });
  });

  buttonVariants.forEach((variant) => {
    Object.keys(variantProps).forEach((prop) => {
      const key =
        `${buttonVarPrefix}-${variant}-${prop as ButtonVariantProperty}` satisfies ButtonVarKeys;
      buttonVars[key] = createVar();
    });
  });

  buttonSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key =
        `${buttonVarPrefix}-${size}-${prop as ButtonSizeProperty}` satisfies ButtonVarKeys;
      buttonVars[key] = createVar();
    });
  });

  return buttonVars;
}
