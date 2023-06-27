import { assignInlineVars } from "@vanilla-extract/dynamic";
import deepmerge from "@fastify/deepmerge";
import { themeVars, commonVars } from "../styles/themes.css";
import { store } from "../models/store";
import { ModePreference, ModePreferences } from "../models/system.model";
import { isSSR } from "./platform";

const merge = deepmerge({ all: true });

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

export const createCustomTheme = (customTheme: typeof themeVars) =>
  assignInlineVars(themeVars, merge(commonVars, customTheme));

const isValidThemeMode = (mode: ModePreference) => {
  return ModePreferences.includes(mode);
};

// Resolve theme mode by priority:
// props.defaultProps > system theme > saved theme
export const resolveThemeMode = (
  defaultTheme?: ModePreference
): ModePreference => {
  const hasHydrated = store.getState()._hasHydrated;

  // While in SSR, return a default theme
  // TODO: document for package consumer to provide fallback UI using _hasHydrated to prevent flashing content
  if (isSSR() || !hasHydrated) return "light";

  if (isValidThemeMode(defaultTheme)) {
    store.getState().setTheme(defaultTheme);
    return defaultTheme;
  }

  // props.defaultTheme is not provided/valid, rely on persisted theme
  const persistedTheme = store.getState().theme;

  if (isValidThemeMode(persistedTheme)) {
    store.getState().setTheme(persistedTheme);
    return persistedTheme;
  }

  // persisted value not a valid theme mode, fallback to 'system'
  store.getState().setTheme("system");
  return "system";
};

export const isPreferLightMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

export const isPreferDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
