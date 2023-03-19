import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { mediaQueryColorScheme } from "../../helpers/dom";
import { store } from "../../models/store";
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
    store.getState().setTheme(props.defaultTheme || "dark");
  });

  onUpdate(() => {
    if (state.isDark) {
      return store.getState().setTheme("dark");
    }

    return store.getState().setTheme("light");
  }, [state.isDark, state.isLight]);

  onMount(() => {
    const darkListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setTheme("dark");
      }
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        store.getState().setTheme("light");
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
