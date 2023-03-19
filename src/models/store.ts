import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { ThemeVariant } from "./system.model";

export interface UIState {
  theme: ThemeVariant;
}

export interface UIAction {
  setTheme: (theme: ThemeVariant) => void;
}

export const store = createStore(
  immer<UIState & UIAction>((set) => ({
    theme: "dark",
    setTheme: (newTheme: ThemeVariant) =>
      set((state) => {
        state.theme = newTheme;
      }),
  }))
);
