import * as React from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { ModePreference, ThemeVariant } from "@/models/system.model";
import { store } from "@/models/store";

const useStore = create(store);

const useInterchainStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      themeClasses: state.themeClasses,
      setThemeMode: state.setThemeMode,
    }),
    shallow
  );
};

type ThemeEvalMode = "force" | "normal";

export default function useTheme() {
  const { theme, setThemeMode, themeClass, themeClasses } =
    useInterchainStore();
  const [themeEvalMode, setThemeEvalMode] =
    React.useState<ThemeEvalMode>("normal");

  const setTheme = React.useCallback((mode: ModePreference) => {
    setThemeMode(mode);
  }, []);

  const toggleColorMode = React.useCallback(() => {
    setThemeMode(theme === "light" ? "dark" : "light");
  }, []);

  const themeEvalRef = React.useRef<HTMLElement | null>(null);
  const forcedModeRef = React.useRef<ThemeVariant | null>(null);

  function recursiveGetColorMode(node: HTMLElement | null) {
    if (!node) return;

    let parent = node.parentElement;
    while (parent) {
      if (parent.dataset.interchainColorMode) {
        return parent.dataset.interchainColorMode as ThemeVariant;
      }
      parent = parent.parentElement;
    }
  }

  function getForceThemeMode(): ThemeVariant {
    if (themeEvalMode === "normal" || !themeEvalRef) return theme;
    if (!!forcedModeRef.current) return forcedModeRef.current;

    // Get closest sentinel element and extract force theme value;
    const forcedMode = recursiveGetColorMode(themeEvalRef.current);

    if (!forcedMode) return theme;
    return forcedMode;
  }

  const getThemeRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node == null) {
      themeEvalRef.current = null;
      return;
    }

    // Try resolve forced theme if there is any
    const forcedMode = recursiveGetColorMode(node);

    if (forcedMode === "light" || forcedMode === "dark") {
      setThemeEvalMode("force");
      forcedModeRef.current = forcedMode;
    }

    themeEvalRef.current = node;
  }, []);

  return {
    theme,
    themeClass:
      themeEvalMode === "force"
        ? // Forced mode, resolve it ourselves
          getForceThemeMode() === "light"
          ? themeClasses[0]
          : themeClasses[1]
        : // Fallback normal behavior
          themeClass,
    setTheme,
    // TODO: refactor to use colorMode naming instead of theme
    // Aliasing for refactoring later
    colorMode: themeEvalMode === "force" ? getForceThemeMode() : theme,
    setColorMode: setTheme,
    toggleColorMode,
    getThemeRef,
  };
}
