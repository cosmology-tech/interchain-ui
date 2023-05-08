import { onMount, Show, useMetadata, useStore } from "@builder.io/mitosis";
import { variants } from "./button.css";
import Icon from "../icon";
import { sprinkles as s } from "../../styles/sprinkles.css";
import type { ButtonProps, ButtonState } from "./button.types";

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
      <button
        class={variants({
          variant: props.variant,
          size: props.size,
          intent: props.disabled ? "disabled" : props.intent,
        })}
      >
        <Show when={!!props.leftIcon}>
          <Icon name={props.leftIcon} className={s({ marginRight: "2" })} />
        </Show>

        {props.children}

        <Show when={!!props.rightIcon}>
          <Icon name={props.rightIcon} className={s({ marginLeft: "2" })} />
        </Show>
      </button>
    </Show>
  );
}
