import type { BaseComponentProps } from "../../models/components.model";
import type { UIState } from "../../models/store";
import type { ComponentOverrideMap } from "../../styles/override/override.types";

export const DEFAULT_VALUES = {
  defaultTheme: "dark",
} as const;

export interface ThemeProviderProps extends BaseComponentProps {
  defaultTheme?: UIState["theme"];
  overrides?: ComponentOverrideMap;
  children?: any;
}
