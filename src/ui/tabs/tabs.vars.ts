import { TabVariant, TabSize } from "../../ui/tabs/tabs.types";

export const tabVariants: TabVariant[] = ["pill", "line"];
export const tabSizes: TabSize[] = ["sm", "md"];

export interface TabVariantProperties {
  // Default state
  bgColor: string;
  textColor: string;
  // Hover state
  hoverBgColor: string;
  hoverTextColor: string;
  // Active state
  activeBgColor: string;
  activeTextColor: string;
  // Disabled state
  disabledBgColor: string;
  disabledTextColor: string;
}

export interface TabSizeProperties {
  fontSize: string;
  fontWeight: string;
  paddingX: string;
  paddingY: string;
  height: string;
  minWidth: string;
}

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
    Object.keys({} as Record<TabVariantProperty, string>).forEach((prop) => {
      const key = `tabs-${variant}-${prop}` as const;
      tabsVars[key] = "";
    });
  });

  tabSizes.forEach((size) => {
    Object.keys({} as Record<TabSizeProperty, string>).forEach((prop) => {
      const key = `tabs-${size}-${prop}` as const;
      tabsVars[key] = "";
    });
  });

  return tabsVars;
}
