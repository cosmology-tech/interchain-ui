import { BaseComponentProps } from "../../models/components.model";
import { UIState } from "../../models/store";

export const DEFAULT_VALUES = {
  defaultTheme: "dark",
} as const;

export interface ThemeProviderProps extends BaseComponentProps {
  defaultTheme?: UIState["theme"];
  children?: any;
}
