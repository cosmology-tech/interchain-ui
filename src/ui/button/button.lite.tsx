import { onMount, Show, useMetadata, useStore } from "@builder.io/mitosis";
import clx from "clsx";
import { variants } from "./button.css";
import Icon from "../icon";
import Box from "../box";
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
      <Box
        as="button"
        {...props.attributes}
        attributes={{
          onClick: (event) => props.onClick?.(event),
          onMouseEnter: (event) => props.onHoverStart?.(event),
          onMouseLeave: (event) => props.onHoverEnd?.(event),
          disabled: props.disabled,
        }}
        className={clx(
          variants({
            variant: props.variant,
            size: props.size,
            intent: props.intent,
            disabled: props.disabled ? true : undefined,
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
      </Box>
    </Show>
  );
}
