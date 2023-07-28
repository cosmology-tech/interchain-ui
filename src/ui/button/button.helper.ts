import clx from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { ThemeVariant } from "../../models/system.model";
import {
  variants,
  intentPrimary,
  intentSecondary,
  intentTertiary,
  intentText,
  disabled,
  baseButton,
} from "./button.css";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant =
  | "solid"
  | "outlined"
  | "link"
  | "ghost"
  | "unstyled";
export type ButtonIntent = "primary" | "secondary" | "tertiary" | "text";

const buttonSize: Record<ButtonSize, Sprinkles> = {
  xs: {
    px: "$4",
    fontSize: "$xs",
    height: "$10",
    minWidth: "$10",
  },
  sm: {
    px: "$6",
    fontSize: "$sm",
    height: "$12",
    minWidth: "$12",
  },
  md: {
    px: "$8",
    fontSize: "$md",
    height: "$14",
    minWidth: "$14",
  },
  lg: {
    px: "$10",
    fontSize: "$lg",
    height: "$15",
    minWidth: "$15",
  },
};

export function getSize(size: ButtonSize): Sprinkles {
  return buttonSize[size];
}

export function recipe({
  variant,
  intent,
  isDisabled,
  theme,
}: {
  variant: ButtonVariant;
  intent: ButtonIntent;
  isDisabled: boolean;
  theme: ThemeVariant;
}) {
  const intentMap: Record<ButtonIntent, typeof intentPrimary> = {
    primary: intentPrimary,
    secondary: intentSecondary,
    tertiary: intentTertiary,
    text: intentText,
  };

  return clx([
    baseButton,
    intentMap[intent][theme],
    intent === "tertiary" && variant === "outlined" ? null : variants[variant],
    isDisabled ? disabled : null,
  ]);
}
