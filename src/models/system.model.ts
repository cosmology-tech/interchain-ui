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

export type ThemeVariant = "light" | "dark";

export type ModePreference = ThemeVariant | "system";

export const ModePreferences: ModePreference[] = ["light", "dark", "system"];

export interface NumberFormatProps {
  value: number | string;
  style?: string;
}
export type NumberFormatter = (props: NumberFormatProps) => string;

export type Token = {
  iconSrc: string;
  name: string;
  symbol: string;
};
