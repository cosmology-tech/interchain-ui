import { onMount, Show, useMetadata, useStore } from "@builder.io/mitosis";
import { buttonStyles } from "./Button.css";
import type { ButtonProps, ButtonState } from "./Button.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  const state = useStore<ButtonState>({
    loaded: false,
  });

  onMount(() => {
    state.loaded = true;
  });

  return (
    <Show when={state.loaded}>
      <button ref={props.forwardedRef} class={buttonStyles}>
        {props.children}
      </button>
    </Show>
  );
}
