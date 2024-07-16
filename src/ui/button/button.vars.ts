import {
  ButtonIntent,
  ButtonSize,
  ButtonVariant,
} from "../../ui/button/button.types";

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

export interface ButtonIntentProperties {
  // Default state
  bgColor: string;
  textColor: string;
  borderColor: string;
  // Hover state
  hoverBgColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  // Active state
  activeBgColor: string;
  activeTextColor: string;
  activeBorderColor: string;
  // Disabled state
  disabledBgColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
}

export interface ButtonVariantProperties {
  // Default state
  bgColor: string;
  textColor: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: string;
  borderWidth: string;
  boxShadow: string;
  // Hover state
  hoverBgColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  hoverBorderRadius: string;
  hoverBorderWidth: string;
  // Active state
  activeBgColor: string;
  activeTextColor: string;
  activeBorderColor: string;
  activeBorderRadius: string;
  activeBorderWidth: string;
  // Disabled state
  disabledBgColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledBorderRadius: string;
  disabledBorderWidth: string;
}

export interface ButtonSizeProperties {
  fontSize: string;
  fontWeight: string;
  paddingX: string;
  paddingY: string;
  height: string;
  minWidth: string;
}

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
  | `button-${ButtonIntent}-${ButtonIntentProperty}`
  | `button-${ButtonVariant}-${ButtonVariantProperty}`
  | `button-${ButtonSize}-${ButtonSizeProperty}`;

export type ButtonVars = {
  [K in ButtonVarKeys]: string;
};

export function generateButtonVars() {
  const buttonVars = {} as ButtonVars;

  // Generate intent-based variables
  buttonIntents.forEach((intent) => {
    Object.keys({} as Record<ButtonIntentProperty, string>).forEach(
      (colorProp) => {
        const key = `button-${intent}-${colorProp}` as const;
        buttonVars[key] = "";
      },
    );
  });

  // Generate variant-based variables
  buttonVariants.forEach((variant) => {
    Object.keys({} as Record<ButtonVariantProperty, string>).forEach((prop) => {
      const key = `button-${variant}-${prop}` as const;
      buttonVars[key] = "";
    });
  });

  // Generate size-based variables
  buttonSizes.forEach((size) => {
    Object.keys({} as Record<ButtonSizeProperty, string>).forEach((prop) => {
      const key = `button-${size}-${prop}` as const;
      buttonVars[key] = "";
    });
  });

  return buttonVars;
}
