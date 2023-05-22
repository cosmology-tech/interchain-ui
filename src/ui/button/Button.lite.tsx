import { onMount, Show, useMetadata, useStore } from "@builder.io/mitosis";
import clx from "clsx";
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
        onClick={(event) => props.onClick?.(event)}
        disabled={props.disabled}
        className={clx(
          variants({
            variant: props.variant,
            size: props.size,
            intent: props.disabled ? "disabled" : props.intent,
          }),
          props.className
        )}
      >
        <Show when={!!props.leftIcon}>
          <Icon
            name={props.leftIcon}
            size={props.iconSize}
            className={s({
              marginRight: !props.children ? "0" : "2",
            })}
          />
        </Show>

        {props.children}

        <Show when={!!props.rightIcon}>
          <Icon
            name={props.rightIcon}
            size={props.iconSize}
            className={s({
              marginLeft: !props.children ? "0" : "2",
            })}
          />
        </Show>
      </button>
    </Show>
  );
}
