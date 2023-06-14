import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { mediaQueryColorScheme } from "../../helpers/style";
import { store } from "../../models/store";
import { darkThemeClass, lightThemeClass } from "../../styles/themes.css";
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
    const preferredTheme = props.defaultTheme || "dark";
    store
      .getState()
      .setTheme(
        preferredTheme,
        preferredTheme === "dark" ? darkThemeClass : lightThemeClass
      );
  });

  onUpdate(() => {
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
  }, [state.isDark, state.isLight, props.defaultTheme]);

  onMount(() => {
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
