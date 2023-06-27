import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ModePreference, ThemeVariant, NumberFormatter } from "./system.model";
import { isPreferDarkMode, isPreferLightMode } from "../helpers/style";
import { darkThemeClass, lightThemeClass } from "../styles/themes.css";

export const STORAGE_NAME = "cosmology-ui-store";

export interface UIState {
  // This is the value persisted in localstorage
  themeMode: ModePreference;
  // This is the value that our theme system uses for styling .ie styleVariants
  // which is derived from themeMode
  theme: ThemeVariant;
  themeClass: string;
  // Useful for use in SSR frameworks to check if the store has hydrated
  // and merged state with localstorage yet
  _hasHydrated: boolean;
}

export interface UIAction {
  setThemeMode: (mode: ModePreference) => void;
  setTheme: (theme: ThemeVariant, themeClass: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export interface I18nState {
  formatNumber: NumberFormatter;
}

export interface I18nAction {
  setFormatNumberFn: (fn: NumberFormatter) => void;
}

export interface UIStore extends UIState, UIAction, I18nState, I18nAction {}

export const store = createStore(
  persist(
    immer<UIStore>((set) => ({
      themeMode: null,
      theme: null,
      themeClass: "",
      _hasHydrated: false,
      setTheme: (newTheme: ThemeVariant, themeClass: string) =>
        set((state) => {
          state.theme = newTheme;
          state.themeClass = themeClass;
        }),
      setThemeMode: (newThemeMode: ModePreference) =>
        set((state) => {
          const themeClass = { dark: darkThemeClass, light: lightThemeClass }[
            newThemeMode
          ];

          const resolveSystemMode = (): [ThemeVariant, string] => {
            if (isPreferDarkMode()) {
              return ["dark", darkThemeClass];
            }
            if (isPreferLightMode()) {
              return ["light", lightThemeClass];
            }
          };

          const [resolvedTheme, resolvedClass] = resolveSystemMode();

          state.themeMode = newThemeMode;
          state.theme = resolvedTheme;
          state.themeClass =
            newThemeMode === "system" ? resolvedClass : themeClass;
        }),
      formatNumber: null,
      setFormatNumberFn: (fn: NumberFormatter) =>
        set((state) => {
          state.formatNumber = fn;
        }),
      setHasHydrated: (hasHydrated) => {
        set({
          _hasHydrated: hasHydrated,
        });
      },
    })),
    {
      name: STORAGE_NAME,
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
      // Only choose to persist theme preference, ignore other state
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
    }
  )
);
