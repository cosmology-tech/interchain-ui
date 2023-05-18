import type { LiteralUnion } from "../helpers/types";
import type { themeVars } from "../styles/themes.css";

export enum Intent {
  None = "",
  Info = "info",
  Success = "warning",
  Warning = "success",
  Error = "error",
}

export const intents = Object.entries(Intent).map(
  ([key, value]: [string, string]) => ({ key, value })
);

// this is prefers-color-scheme setting
export type PreferColorScheme = "light" | "dark";

export type ThemeVariant = LiteralUnion<"default", string>;

export type SingleThemeDef = {
  name: string;
  type: "single";
  tokens: typeof themeVars;
};

export type DualThemeDef = {
  name: string;
  type: "dual";
  tokens: {
    light: typeof themeVars;
    dark: typeof themeVars;
  };
};

export type ThemeDef = SingleThemeDef | DualThemeDef;
