import { BaseComponentProps } from "../../models/components.model";
import { ThemeDef } from "../../models/system.model";
import { UIState } from "../../models/store";

export const DEFAULT_VALUES = {
  defaultScheme: "light",
  defaultTheme: "default",
} as const;

export interface ThemeProviderProps extends BaseComponentProps {
  themeDefs?: Array<ThemeDef>;
  defaultScheme?: UIState["scheme"];
  theme?: UIState["theme"];
  children?: any;
}
