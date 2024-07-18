import { createVar } from "@vanilla-extract/css";
import { TabVariant, TabSize } from "./tabs.types";
import { StringifyValues } from "../../helpers/types";

export const tabVariants: TabVariant[] = ["pill", "line"];
export const tabSizes: TabSize[] = ["sm", "md"];

const variantProps = {
  // Default state
  bgColor: "",
  textColor: "",
  // Hover state
  hoverBgColor: "",
  hoverTextColor: "",
  // Active state
  activeBgColor: "",
  activeTextColor: "",
  // Disabled state
  disabledBgColor: "",
  disabledTextColor: "",
} as const;

const sizeProps = {
  fontSize: "",
  fontWeight: "",
  paddingX: "",
  paddingY: "",
  height: "",
  minWidth: "",
} as const;

export type TabVariantProperties = StringifyValues<typeof variantProps>;
export type TabSizeProperties = StringifyValues<typeof sizeProps>;

export type TabVariantProperty = keyof TabVariantProperties;
export type TabSizeProperty = keyof TabSizeProperties;

export type TabVariantScheme = Partial<
  Record<TabVariant, Partial<TabVariantProperties>>
>;
export type TabSizeScheme = Partial<
  Record<TabSize, Partial<TabSizeProperties>>
>;

export type TabsVarKeys =
  | `tabs-${TabVariant}-${TabVariantProperty}`
  | `tabs-${TabSize}-${TabSizeProperty}`;

export type TabsVars = {
  [K in TabsVarKeys]: string;
};

export function generateTabsVars() {
  const tabsVars = {} as TabsVars;

  tabVariants.forEach((variant) => {
    Object.keys(variantProps).forEach((prop) => {
      const key = `tabs-${variant}-${prop}` as const;
      tabsVars[key] = createVar();
    });
  });

  tabSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key = `tabs-${size}-${prop}` as const;
      tabsVars[key] = createVar();
    });
  });

  return tabsVars;
}
