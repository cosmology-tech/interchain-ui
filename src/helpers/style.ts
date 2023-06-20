import { assignInlineVars } from "@vanilla-extract/dynamic";
import deepmerge from "@fastify/deepmerge";
import {
  themeVars,
  darkThemeClass,
  lightThemeClass,
  commonVars,
} from "../styles/themes.css";
import { store } from "../models/store";
import { ModePreference, ModePreferences } from "../models/system.model";
import { isSSR } from "./platform";

const merge = deepmerge({ all: true });

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

export const createCustomTheme = (customTheme: typeof themeVars) =>
  assignInlineVars(themeVars, merge(commonVars, customTheme));

export const resolveThemeMode = (
  isDark: boolean,
  defaultTheme?: ModePreference
): ModePreference => {
  const hasHydrated = store.getState()._hasHydrated;

  // While in SSR, return a default theme
  // TODO: document for package consumer to provide fallback UI using _hasHydrated to prevent flashing content
  if (isSSR() || !hasHydrated) return "light";

  const resolveThemeClass = (mode: ModePreference) => {
    if (mode === "dark" || mode === "light") {
      return { dark: darkThemeClass, light: lightThemeClass }[mode];
    }

    if (isDark) {
      return darkThemeClass;
    }

    return lightThemeClass;
  };

  const isValidThemeMode = (mode: ModePreference) => {
    return ModePreferences.includes(mode);
  };

  if (isValidThemeMode(defaultTheme)) {
    store.getState().setTheme(defaultTheme, resolveThemeClass(defaultTheme));
    return defaultTheme;
  }

  // props.defaultTheme is not provided/valid, rely on persisted theme
  const persistedTheme = store.getState().theme;

  if (isValidThemeMode(persistedTheme)) {
    store
      .getState()
      .setTheme(persistedTheme, resolveThemeClass(persistedTheme));
    return persistedTheme;
  }

  // persisted value not a valid theme mode, fallback to 'system'
  store.getState().setTheme("system", resolveThemeClass("system"));
  return "system";
};
