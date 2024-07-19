import { createVar } from "@vanilla-extract/css";
import { TabVariant, TabSize } from "./tabs.types";
import { StringifyValues } from "../../helpers/types";

export const tabsVarPrefix = "Tabs" as const;
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
  | `${typeof tabsVarPrefix}-${TabVariant}-${TabVariantProperty}`
  | `${typeof tabsVarPrefix}-${TabSize}-${TabSizeProperty}`;

export type TabsVars = {
  [K in TabsVarKeys]: string;
};

export function generateTabsVars() {
  const tabsVars = {} as TabsVars;

  tabVariants.forEach((variant) => {
    Object.keys(variantProps).forEach((prop) => {
      const key =
        `Tabs-${variant}-${prop as TabVariantProperty}` satisfies TabsVarKeys;
      tabsVars[key] = createVar();
    });
  });

  tabSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key =
        `Tabs-${size}-${prop as TabSizeProperty}` satisfies TabsVarKeys;
      tabsVars[key] = createVar();
    });
  });

  return tabsVars;
}
