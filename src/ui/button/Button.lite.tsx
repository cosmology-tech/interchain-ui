import {
  onMount,
  Show,
  useMetadata,
  useStore,
  useDefaultProps,
} from "@builder.io/mitosis";
import { variants } from "./button.css";
import type { ButtonProps, ButtonState } from "./button.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  useDefaultProps({
    variant: "solid",
    intent: "primary",
    size: "md",
  });

  const state = useStore<ButtonState>({
    loaded: false,
  });

  onMount(() => {
    state.loaded = true;
  });

  return (
    <Show when={state.loaded}>
      <button
        class={variants({
          variant: props.variant,
          size: props.size,
          intent: props.disabled ? "disabled" : props.intent,
        })}
      >
        {props.children}
      </button>
    </Show>
  );
}
