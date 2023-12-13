import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import isEqual from "lodash/isEqual";
import {
  mediaQueryColorScheme,
  resolveThemeMode,
  getAccent,
  getAccentText,
} from "../../helpers/style";
import { isSSR } from "../../helpers/platform";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
import { assignThemeVars } from "../../styles/override/override";
import type { ThemeProviderProps } from "./theme-provider.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

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

  // System mode: change based on user preference
  onUpdate(() => {
    if (!state.preferredMode || !state.isMounted) return;

    const themeMode = store.getState().themeMode;

    if (themeMode === "system") {
      return store.getState().setThemeMode(themeMode);
    }
  }, [state.preferredMode, store.getState().theme, state.isMounted]);

  // Handle custom themes
  onUpdate(() => {
    const themeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && themeDefs.length > 0;
    if (!isValidThemeDefs) return;

    if (!isEqual(store.getState().themeDefs, themeDefs)) {
      store.getState().setThemeDefs(themeDefs);
    }
  }, [props.themeDefs]);

  // Handle select customTheme
  onUpdate(() => {
    if (!props.customTheme) return;

    store.getState().setCustomTheme(props.customTheme);
  }, [props.customTheme]);

  onUpdate(() => {
    const overrideStyleManager = store.getState().overrideStyleManager;
    overrideStyleManager.update(props.overrides, null);
  }, [props.overrides]);

  onUpdate(() => {
    const prevAccent = store.getState().themeAccent;
    const currentColorMode = store.getState().theme;

    if (prevAccent !== props.accent) {
      store.getState().setThemeAccent(props.accent ?? "blue");

      assignThemeVars(
        {
          colors: {
            // @ts-expect-error
            accent: getAccent(props.accent, currentColorMode ?? "light"),
            // @ts-expect-error
            accentText: getAccentText(currentColorMode ?? "light"),
          },
        },
        currentColorMode
      );
    }
  }, [props.accent]);

  onMount(() => {
    resolveThemeMode(props.defaultTheme);
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

  return (
    <div
      data-interchain-color-mode={
        props.forceColorMode == null ? undefined : props.forceColorMode
      }
      style={{
        visibility: state.isMounted ? "visible" : "hidden",
      }}
    >
      {props.children}
    </div>
  );
}
