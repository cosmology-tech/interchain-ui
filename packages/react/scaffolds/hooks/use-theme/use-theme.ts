import { useCallback } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { ModePreference } from "@/models/system.model";
import { store } from "@/models/store";

const useStore = create(store);

const useInterchainStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      setThemeMode: state.setThemeMode,
    }),
    shallow
  );
};

export default function useTheme() {
  const { theme, setThemeMode, themeClass } = useInterchainStore();

  const setTheme = useCallback((mode: ModePreference) => {
    setThemeMode(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setThemeMode(theme === "light" ? "dark" : "light");
  }, []);

  return {
    theme,
    themeClass,
    setTheme,
    // TODO: refactor to use colorMode naming instead of theme
    // Aliasing for refactoring later
    colorMode: theme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}
