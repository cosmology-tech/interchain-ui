import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ModePreference, NumberFormatter } from "./system.model";
import { isPreferDarkMode, isPreferLightMode } from "../helpers/style";
import { darkThemeClass, lightThemeClass } from "../styles/themes.css";

export const STORAGE_NAME = "cosmology-ui-store";

export interface UIState {
  theme: ModePreference;
  themeClass: string;
  // Useful for use in SSR frameworks to check if the store has hydrated
  // and merged state with localstorage yet
  _hasHydrated: boolean;
}

export interface UIAction {
  setTheme: (theme: ModePreference) => void;
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
      theme: null,
      themeClass: "",
      _hasHydrated: false,
      setTheme: (newTheme: ModePreference) =>
        set((state) => {
          state.theme = newTheme;

          const themeClass = { dark: darkThemeClass, light: lightThemeClass }[
            newTheme
          ];

          const resolveSystem = () => {
            if (isPreferDarkMode()) return darkThemeClass;
            if (isPreferLightMode()) return lightThemeClass;
            return "";
          };

          state.themeClass =
            newTheme === "system" ? resolveSystem() : themeClass;
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
        theme: state.theme,
      }),
    }
  )
);
