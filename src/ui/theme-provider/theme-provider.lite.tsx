import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import clsx from "clsx";
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
    internalTheme: string;
    themeClass: string;
    UIStore: ReturnType<typeof store.getState>;
    // Local custom theme state for nested themes
    localCustomTheme: string | null;
    localThemeDefs: Array<ThemeDef>;
    getNewThemeClass: (uiStore: ReturnType<typeof store.getState>) => string;
  }>({
    preferredMode: null,
    isMounted: false,
    localCustomTheme: null,
    localThemeDefs: [],
    internalTheme: "light",
    UIStore: store.getState(),
    get isControlled() {
      return props.themeMode != null;
    },
    get isReady() {
      return state.preferredMode && state.isMounted;
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
    get themeClass() {
      return state.getNewThemeClass(store.getState());
    },
    getNewThemeClass: (uiStore: ReturnType<typeof store.getState>) => {
      if (state.isControlled) {
        if (props.themeMode === "system") {
          const finalThemeMode = state.isReady
            ? state.preferredMode
            : props.themeMode;
          return finalThemeMode === "dark" ? darkThemeClass : lightThemeClass;
        }

        return props.themeMode === "dark" ? darkThemeClass : lightThemeClass;
      }

      return uiStore.themeClass;
    },
  });

  // NOTE: every mention of .theme will be referencing theme from state because mitosis is not smart enough
  // System mode: change based on user preference
  onUpdate(() => {
    if (!state.isReady) {
      return;
    }

    const themeMode = store.getState().themeMode;
    const setThemeModeFn = store.getState().setThemeMode;

    if (themeMode === "system" || themeMode == null) {
      return setThemeModeFn("system");
    }
  }, [state.preferredMode, state.internalTheme, state.isReady, state.UIStore]);

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
      if (!isEqual(store.getState().themeDefs, finalThemeDefs)) {
        store.getState().setThemeDefs(finalThemeDefs);
      }
    }
  }, [props.themeDefs, state.isControlled]);

  // Handle select customTheme
  onUpdate(() => {
    if (!props.customTheme) return;

    // TODO: handle custom theme for controlled mode
    store.getState().setCustomTheme(props.customTheme);
  }, [props.customTheme]);

  onUpdate(() => {
    const overrideStyleManager = store.getState().overrideStyleManager;

    if (!overrideStyleManager) {
      return;
    }

    overrideStyleManager.update(props.overrides, null);
  }, [props.overrides]);

  onUpdate(() => {
    // Skip if accent is not provided
    if (!props.accent) return;

    const prevAccent = state.UIStore.themeAccent;
    const currentColorMode = state.UIStore.theme;

    if (prevAccent !== props.accent) {
      state.UIStore.setThemeAccent(props.accent ?? "blue");

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

    // Resolve the theme mode
    const resolvedThemeMode = resolveThemeMode(props.defaultTheme);

    // Set the initial theme based on the resolved mode
    if (!state.isControlled) {
      store.getState().setThemeMode(resolvedThemeMode);
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

    const cleanupStore = store.subscribe((newState) => {
      state.UIStore = newState;
      state.internalTheme = newState.theme;
    });

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
      if (typeof state.darkQuery.removeEventListener === "function") {
        state.darkQuery?.removeEventListener("change", darkListener);
      }

      if (typeof state.lightQuery.removeEventListener === "function") {
        state.lightQuery?.removeEventListener("change", lightListener);
      }

      if (typeof cleanupStore === "function") {
        cleanupStore();
      }
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
      className={clsx(state.themeClass, props.className)}
    >
      {props.children}
    </div>
  );
}
