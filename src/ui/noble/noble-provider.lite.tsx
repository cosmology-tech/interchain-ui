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
  nobleDarkThemeClass,
  nobleLightThemeClass,
} from "../../styles/themes.css";
import type { NobleProviderProps } from "./noble.types";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

export default function NobleProvider(props: NobleProviderProps) {
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
        [nobleLightThemeClass]: state.theme === "light",
        [nobleDarkThemeClass]: state.theme === "dark",
      })}
    >
      {props.children}
    </div>
  );
}
