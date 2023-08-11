import { createVar } from "@vanilla-extract/css";

export type CssVar = ReturnType<typeof createVar>;

export type OverridableState = "hover" | "active" | "disabled" | "focused";

export type Bg = "bg" | `${OverridableState}Bg`;

export type TextColor = "color" | `${OverridableState}Color`;

export type Shadow = "shadow" | `${OverridableState}Shadow`;

export type BorderColor = "borderColor" | `${OverridableState}BorderColor`;

export type OverridableProp = Bg | TextColor | Shadow | BorderColor;

export type OverridableComponents = "button";

export type OverrideValue = Partial<
  Record<OverridableProp, { light: string; dark: string }>
>;

// This is provided for user to provide concrete values to override a component
export type ComponentOverrideMap = Partial<
  Record<OverridableComponents, OverrideValue>
>;

// This tells us how to override a component
export type ComponentOverrideSchema = {
  name: OverridableComponents;
  overrides: Array<[CssVar, OverridableProp]>;
};
