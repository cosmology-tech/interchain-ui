import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import { isEqual } from "lodash";
import {
  mediaQueryColorScheme,
  resolveThemeMode,
  getAccent,
  getAccentText,
} from "../../helpers/style";
import { lightThemeClass, darkThemeClass } from "../../styles/themes.css";
import { isSSR } from "../../helpers/platform";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
import { assignThemeVars } from "../../styles/override/override";
import type { ThemeDef } from "../../styles/override/override.types";
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
    isReady: boolean;
    isLight: boolean;
    isMounted: boolean;
    isControlled: boolean;
    preferredMode: ThemeVariant | null;
    storeState: ReturnType<typeof store.getState>;
    theme: string;
    themeClass: string;
    // Local custom theme state for nested themes
    localCustomTheme: string | null;
    localThemeDefs: Array<ThemeDef>;
  }>({
    preferredMode: null,
    isMounted: false,
    localCustomTheme: null,
    localThemeDefs: [],
    get isControlled() {
      return props.themeMode != null;
    },
    get isReady() {
      return state.preferredMode && state.isMounted;
    },
    get themeClass() {
      if (state.isControlled) {
        if (props.themeMode === "system") {
          const finalThemeMode = state.isReady
            ? state.preferredMode
            : props.themeMode;
          return finalThemeMode === "dark" ? darkThemeClass : lightThemeClass;
        }

        return props.themeMode === "dark" ? darkThemeClass : lightThemeClass;
      }

      return store.getState().themeClass;
    },
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
    if (!state.isReady) return;

    const themeMode = state.storeState.themeMode;

    if (themeMode === "system") {
      return state.storeState.setThemeMode(themeMode);
    }
  }, [state.preferredMode, state.theme, state.isMounted]);

  // Handle custom themes change
  onUpdate(() => {
    const finalThemeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && finalThemeDefs.length > 0;

    if (!isValidThemeDefs) {
      return;
    }

    // Only set global custom themes if props.themeMode is not controlled
    // controlled props.themeMode usage means that the user is managing nested theme
    if (state.isControlled) {
      return;
    } else {
      if (!isEqual(state.storeState.themeDefs, finalThemeDefs)) {
        state.storeState.setThemeDefs(finalThemeDefs);
      }
    }
  }, [props.themeDefs]);

  // Handle select customTheme
  onUpdate(() => {
    if (!props.customTheme) return;

    // TODO: handle custom theme for controlled mode
    state.storeState.setCustomTheme(props.customTheme);
  }, [props.customTheme]);

  onUpdate(() => {
    const overrideStyleManager = state.storeState.overrideStyleManager;
    if (!overrideStyleManager) return;
    overrideStyleManager.update(props.overrides, null);
  }, [props.overrides]);

  onUpdate(() => {
    // Skip if accent is not provided
    if (!props.accent) return;

    const prevAccent = state.storeState.themeAccent;
    const currentColorMode = state.storeState.theme;

    if (prevAccent !== props.accent) {
      state.storeState.setThemeAccent(props.accent ?? "blue");

      assignThemeVars(
        {
          colors: {
            // @ts-ignore
            accent: getAccent(props.accent, currentColorMode ?? "light"),
            // @ts-ignore
            accentText: getAccentText(currentColorMode ?? "light"),
          },
        },
        currentColorMode,
      );
    }
  }, [props.accent]);

  onMount(() => {
    state.isMounted = true;

    // Dont set global theme mode if in controlled mode
    if (!state.isControlled) {
      resolveThemeMode(props.defaultTheme);
    }

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

    if (state.darkQuery && state.lightQuery) {
      if (
        typeof state.darkQuery.addEventListener === "function" &&
        typeof state.lightQuery.addEventListener === "function"
      ) {
        state.darkQuery?.addEventListener("change", darkListener);
        state.lightQuery?.addEventListener("change", lightListener);
      }
    }

    cleanupRef = () => {
      state.darkQuery?.removeEventListener("change", darkListener);
      state.lightQuery?.removeEventListener("change", lightListener);
    };
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return (
    <div
      data-is-controlled={state.isControlled}
      data-interchain-theme-mode={
        props.themeMode == null ? undefined : props.themeMode
      }
      style={{
        visibility: state.isMounted ? "visible" : "hidden",
      }}
      className={state.themeClass}
    >
      {props.children}
    </div>
  );
}
