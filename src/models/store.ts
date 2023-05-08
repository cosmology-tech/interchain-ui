import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { ThemeVariant } from "./system.model";

export interface UIState {
  theme: ThemeVariant;
  themeClass: string;
}

export interface UIAction {
  setTheme: (theme: ThemeVariant, themeClass: string) => void;
}

export interface UIStore extends UIState, UIAction {}

export const store = createStore(
  immer<UIStore>((set) => ({
    theme: "dark",
    themeClass: "",
    setTheme: (newTheme: ThemeVariant, themeClass: string) =>
      set((state) => {
        state.theme = newTheme;
        state.themeClass = themeClass;
      }),
  }))
);
