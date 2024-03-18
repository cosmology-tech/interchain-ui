import {
  onMount,
  onUnMount,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
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
  const state = useStore<{
    theme: ThemeVariant;
  }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
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
        [meshLightThemeClass]: state.theme === "light",
        [meshDarkThemeClass]: state.theme === "dark",
      })}
    >
      {props.children}
    </div>
  );
}
