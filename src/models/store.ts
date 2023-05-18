import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { ThemeVariant, PreferColorScheme, ThemeDef } from "./system.model";

export interface UIState {
  scheme: PreferColorScheme;
  schemeClass: string;
  theme: ThemeVariant;
  themeDefs: Array<ThemeDef>;
}

export interface UIAction {
  setTheme: (themeName: string) => void;
  setScheme: (scheme: PreferColorScheme, schemeClass: string) => void;
  setThemeDefs: (defs: Array<ThemeDef>, defaultTheme?: string) => void;
}

export interface UIStore extends UIState, UIAction {}

export const store = createStore(
  immer<UIStore>((set) => ({
    theme: "default",
    scheme: "light",
    schemeClass: "",
    themeDefs: [],
    setTheme: (themeName: string) => {
      set((state) => {
        state.theme = themeName;
      });
    },
    setThemeDefs: (defs: Array<ThemeDef>, defaultTheme?: string) => {
      set((state) => {
        const firstThemeName = defs[0].name;
        state.themeDefs = defs;
        state.theme = defaultTheme ?? firstThemeName;
      });
    },
    setScheme: (newScheme: PreferColorScheme, schemeClass: string) =>
      set((state) => {
        state.scheme = newScheme;
        state.schemeClass = schemeClass;
      }),
  }))
);
