import { globalStyle, GlobalStyleRule } from "@vanilla-extract/css";
import { store } from "../models/store";
import { ModePreference, ModePreferences } from "../models/system.model";
import { isSSR } from "./platform";

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

const isValidThemeMode = (mode: ModePreference) => {
  return ModePreferences.includes(mode);
};

// Resolve theme mode by priority:
// props.defaultProps > saved theme > system theme
export const resolveThemeMode = (
  defaultThemeMode?: ModePreference
): ModePreference => {
  const hasHydrated = store.getState()._hasHydrated;

  // While in SSR, return a default theme
  // TODO: document for package consumer to provide fallback UI using _hasHydrated to prevent flashing content
  if (isSSR() || !hasHydrated) return "light";

  if (isValidThemeMode(defaultThemeMode)) {
    store.getState().setThemeMode(defaultThemeMode);
    return defaultThemeMode;
  }

  // props.defaultThemeMode is not provided or invalid, rely on persisted theme
  const savedTheme = store.getState().themeMode;

  if (isValidThemeMode(savedTheme)) {
    store.getState().setThemeMode(savedTheme);
    return savedTheme;
  }

  // persisted value not a valid theme mode, fallback to 'system'
  store.getState().setThemeMode("system");
  return "system";
};

export const isPreferLightMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

export const isPreferDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function childSelectors(
  styleVariantsSelector: string,
  selector: string,
  rule: GlobalStyleRule
) {
  const allSelectors = Array.from(new Set(styleVariantsSelector.split(" ")));
  const targetSelector = allSelectors[allSelectors.length - 1];
  globalStyle(`${targetSelector} ${selector}`, rule);
}
