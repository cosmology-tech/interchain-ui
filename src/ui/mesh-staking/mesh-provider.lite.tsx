import {
  onMount,
  onUnMount,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import {
  meshDarkThemeClass,
  meshLightThemeClass,
} from "../../styles/themes.css";
import type { MeshProviderProps } from "./mesh-staking.types";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

export default function MeshProvider(props: MeshProviderProps) {
  const state = useStore({
    theme: "light",
    get isControlled() {
      return props.themeMode != null;
    },
    get providerThemeMode() {
      if (state.isControlled) return props.themeMode;
      return state.theme;
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    // Controlled theme mode
    if (state.isControlled) return;

    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <div
      className={clx({
        [meshLightThemeClass]: state.providerThemeMode === "light",
        [meshDarkThemeClass]: state.providerThemeMode === "dark",
      })}
    >
      {props.children}
    </div>
  );
}
