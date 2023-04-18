<template>
  <div><slot /></div>
</template>

<script lang="ts">
import { mediaQueryColorScheme } from "../../helpers/dom";
import { store } from "../../models/store";
import { darkThemeClass, lightThemeClass } from "../../styles/themes.css";
import "../../styles/global.css";
import { ThemeProviderProps } from "./theme-provider.types";

export default {
  name: "theme-provider",

  props: ["defaultTheme"],

  mounted() {
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
    state.darkQuery!.addEventListener("change", darkListener);
    state.lightQuery!.addEventListener("change", lightListener);
    cleanupRef.value = () => {
      state.darkQuery!.removeEventListener(`change`, darkListener);
      state.lightQuery!.removeEventListener(`change`, lightListener);
    };
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (typeof props.defaultTheme === "string") {
          const preferredTheme = props.defaultTheme || "dark";
          return store
            .getState()
            .setTheme(
              preferredTheme,
              preferredTheme === "dark" ? darkThemeClass : lightThemeClass
            );
        }
        if (state.isDark) {
          return store.getState().setTheme("dark", darkThemeClass);
        }
        return store.getState().setTheme("light", lightThemeClass);
      },
      immediate: true,
    },
  },
  unmounted() {
    if (typeof cleanupRef.value === "function") {
      cleanupRef();
    }
  },

  computed: {
    lightQuery() {
      return window.matchMedia?.(mediaQueryColorScheme(`light`));
    },
    darkQuery() {
      return window.matchMedia?.(mediaQueryColorScheme(`dark`));
    },
    isDark() {
      return state.darkQuery?.matches;
    },
    isLight() {
      return state.lightQuery?.matches;
    },
  },
};
</script>