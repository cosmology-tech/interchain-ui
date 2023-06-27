import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { mediaQueryColorScheme } from "../../helpers/style";
import { isSSR } from "../../helpers/platform";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
import { resolveThemeMode } from "../../helpers/style";
import type { ThemeProviderProps } from "./theme-provider.types";

export default function ThemeProvider(props: ThemeProviderProps) {
  let cleanupRef = useRef<() => void>(null);

  const state = useStore<{
    lightQuery: any;
    darkQuery: any;
    isDark: boolean;
    isLight: boolean;
    isMounted: boolean;
    preferredMode: ThemeVariant | null;
  }>({
    preferredMode: null,
    isMounted: false,
    get lightQuery() {
      if (isSSR()) return null;
      return window?.matchMedia?.(mediaQueryColorScheme(`light`));
    },
    get darkQuery() {
      if (isSSR()) return null;
      return window?.matchMedia?.(mediaQueryColorScheme(`dark`));
    },
    get isDark() {
      return !!state.darkQuery?.matches;
    },
    get isLight() {
      return !!state.lightQuery?.matches;
    },
  });

  onUpdate(() => {
    if (!state.preferredMode || !state.isMounted) return;

    const theme = store.getState().theme;

    if (theme === "system") {
      console.log("ThemeProvider: system");
      return store.getState().setTheme(state.preferredMode);
    }
  }, [state.preferredMode, store.getState().theme, state.isMounted]);

  onMount(() => {
    const resolved = resolveThemeMode(props.defaultTheme);
    console.log("onMount", resolved);
    state.isMounted = true;

    const darkListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        state.preferredMode = "dark";
      }
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        state.preferredMode = "light";
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
