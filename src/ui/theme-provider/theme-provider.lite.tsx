import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { mediaQueryColorScheme } from "../../helpers/style";
import { store } from "../../models/store";
import { darkSchemeClass, lightSchemeClass } from "../../styles/themes.css";
import "../../styles/global.css";
import { assignThemeVars } from "../../helpers/style";
import type { ThemeProviderProps } from "./theme-provider.types";

export default function ThemeProvider(props: ThemeProviderProps) {
  let cleanupRef = useRef<() => void>(null);
  const state = useStore<{
    lightQuery: any;
    darkQuery: any;
    isDark: boolean;
    isLight: boolean;
  }>({
    get lightQuery() {
      return window.matchMedia?.(mediaQueryColorScheme(`light`));
    },
    get darkQuery() {
      return window.matchMedia?.(mediaQueryColorScheme(`dark`));
    },
    get isDark() {
      return state.darkQuery?.matches;
    },
    get isLight() {
      return state.lightQuery?.matches;
    },
  });

  onMount(() => {
    const preferredScheme = props.defaultScheme || "dark";
    store
      .getState()
      .setScheme(
        preferredScheme,
        preferredScheme === "dark" ? darkSchemeClass : lightSchemeClass
      );
  });

  onUpdate(() => {
    if (typeof props.defaultScheme === "string") {
      const preferredScheme = props.defaultScheme || "dark";
      return store
        .getState()
        .setScheme(
          preferredScheme,
          preferredScheme === "dark" ? darkSchemeClass : lightSchemeClass
        );
    }

    if (state.isDark) {
      return store.getState().setScheme("dark", darkSchemeClass);
    }

    return store.getState().setScheme("light", lightSchemeClass);
  }, [state.isDark, state.isLight, props.defaultScheme]);

  onUpdate(() => {
    const themeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && themeDefs.length > 0;
    if (!isValidThemeDefs) return;

    store.getState().setThemeDefs(themeDefs, props.theme);
  }, [props.themeDefs]);

  onUpdate(() => {
    const themeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && themeDefs.length > 0;
    const allThemeNames = themeDefs.map((def) => def.name);
    allThemeNames.push("default");
    const isValidTheme =
      typeof props.theme === "string" && allThemeNames.includes(props.theme);

    if (!isValidTheme || !isValidThemeDefs) return;

    store.getState().setTheme(props.theme);
    const themeDefinition = themeDefs.find((def) => def.name === props.theme);
    const scheme = state.isDark ? "dark" : "light";

    assignThemeVars(
      themeDefinition.type === "single"
        ? themeDefinition.tokens
        : themeDefinition.tokens[scheme],
      scheme
    );
  }, [state.isDark, state.isLight, props.theme]);

  onMount(() => {
    const darkListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setScheme("dark", darkSchemeClass);
      }
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setScheme("light", lightSchemeClass);
      }
    };

    state.darkQuery!.addEventListener("change", darkListener);
    state.lightQuery!.addEventListener("change", lightListener);

    cleanupRef = () => {
      state.darkQuery!.removeEventListener(`change`, darkListener);
      state.lightQuery!.removeEventListener(`change`, lightListener);
    };
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return <div>{props.children}</div>;
}
