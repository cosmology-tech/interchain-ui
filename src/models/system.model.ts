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

export interface NumberFormatProps {
  value: number;
  style?: string;
}
export type NumberFormatter = (props: NumberFormatProps) => string;
