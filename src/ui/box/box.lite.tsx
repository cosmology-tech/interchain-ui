import { onMount, Show, useMetadata, useStore } from "@builder.io/mitosis";
import type { BoxProps, BoxState } from "./box.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Box(props: BoxProps) {
  const state = useStore<BoxState>({
    loaded: false,
  });

  onMount(() => {
    state.loaded = true;
  });

  return (
    <Show when={state.loaded}>
      <div ref={props.forwardedRef}>{props.children}</div>
    </Show>
  );
}
