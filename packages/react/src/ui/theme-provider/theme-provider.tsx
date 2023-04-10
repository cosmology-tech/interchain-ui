import * as React from "react";
import { useRef, useEffect } from "react";
import { mediaQueryColorScheme } from "../../helpers/dom";
import { store } from "../../models/store";
import { darkThemeClass, lightThemeClass } from "../../styles/themes.css";
import "../../styles/global.css";
import { ThemeProviderProps } from "./theme-provider.types";

function ThemeProvider(props: ThemeProviderProps) {
  const cleanupRef = useRef<() => void>(null);
  function lightQuery() {
    return window.matchMedia?.(mediaQueryColorScheme(`light`));
  }

  function darkQuery() {
    return window.matchMedia?.(mediaQueryColorScheme(`dark`));
  }

  function isDark() {
    return darkQuery?.()?.matches;
  }

  function isLight() {
    return lightQuery?.()?.matches;
  }

  useEffect(() => {
    const darkListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setTheme("dark", darkThemeClass);
      }
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setTheme("light", lightThemeClass);
      }
    };
    darkQuery()!.addEventListener("change", darkListener);
    lightQuery()!.addEventListener("change", lightListener);
    cleanupRef.current = () => {
      darkQuery()!.removeEventListener(`change`, darkListener);
      lightQuery()!.removeEventListener(`change`, lightListener);
    };
  }, []);

  useEffect(() => {
    if (typeof props.defaultTheme === "string") {
      const preferredTheme = props.defaultTheme || "dark";
      return store
        .getState()
        .setTheme(
          preferredTheme,
          preferredTheme === "dark" ? darkThemeClass : lightThemeClass
        );
    }
    if (isDark()) {
      return store.getState().setTheme("dark", darkThemeClass);
    }
    return store.getState().setTheme("light", lightThemeClass);
  }, [isDark(), isLight(), props.defaultTheme]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);

  return <div>{props.children}</div>;
}

export default ThemeProvider;
