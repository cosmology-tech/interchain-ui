import type { BaseComponentProps } from "../../models/components.model";
import type { UIState } from "../../models/store";
import type { ThemeDef } from "../../styles/override/override.types";
import type { ComponentOverrideMap } from "../../styles/override/override.types";

export const DEFAULT_VALUES = {
  defaultTheme: "dark",
  customTheme: null,
} as const;

export interface ThemeProviderProps extends BaseComponentProps {
  defaultTheme?: UIState["theme"];
  overrides?: ComponentOverrideMap;
  children?: any;
  themeDefs?: Array<ThemeDef>;
  customTheme?: UIState["customTheme"];
}
