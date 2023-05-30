import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { ThemeVariant, NumberFormatter } from "./system.model";

export interface UIState {
  theme: ThemeVariant;
  themeClass: string;
}

export interface UIAction {
  setTheme: (theme: ThemeVariant, themeClass: string) => void;
}

export interface I18nState {
  formatNumber: NumberFormatter;
}
export interface I18nAction {
  setFormatNumberFn: (fn: NumberFormatter) => void;
}

export interface UIStore extends UIState, UIAction, I18nState, I18nAction {}

export const store = createStore(
  immer<UIStore>((set) => ({
    theme: "dark",
    themeClass: "",
    setTheme: (newTheme: ThemeVariant, themeClass: string) =>
      set((state) => {
        state.theme = newTheme;
        state.themeClass = themeClass;
      }),
    formatNumber: null,
    setFormatNumberFn: (fn: NumberFormatter) =>
      set((state) => {
        state.formatNumber = fn;
      }),
  }))
);
