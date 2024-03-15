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
    storeState: ReturnType<typeof store.getState>;
    theme: string;
  }>({
    preferredMode: null,
    isMounted: false,
    get storeState() {
      return store.getState();
    },
    get theme() {
      return state.storeState.theme;
    },
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

    const themeMode = state.storeState.themeMode;

    if (themeMode === "system") {
      return state.storeState.setThemeMode(themeMode);
    }
  }, [state.preferredMode, state.theme, state.isMounted]);

  // Handle custom themes
  onUpdate(() => {
    const finalThemeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && finalThemeDefs.length > 0;

    if (!isValidThemeDefs) return;

    if (!isEqual(state.storeState.themeDefs, finalThemeDefs)) {
      state.storeState.setThemeDefs(finalThemeDefs);
    }
  }, [props.themeDefs]);

  // Handle select customTheme
  onUpdate(() => {
    if (!props.customTheme) return;

    state.storeState.setCustomTheme(props.customTheme);
  }, [props.customTheme]);

  onUpdate(() => {
    const overrideStyleManager = state.storeState.overrideStyleManager;
    overrideStyleManager.update(props.overrides, null);
  }, [props.overrides]);

  onUpdate(() => {
    const prevAccent = state.storeState.themeAccent;
    const currentColorMode = state.storeState.theme;

    if (prevAccent !== props.accent) {
      state.storeState.setThemeAccent(props.accent ?? "blue");

      assignThemeVars(
        {
          colors: {
            // @ts-expect-error
            accent: getAccent(props.accent, currentColorMode ?? "light"),
            // @ts-expect-error
            accentText: getAccentText(currentColorMode ?? "light"),
          },
        },
        currentColorMode,
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
