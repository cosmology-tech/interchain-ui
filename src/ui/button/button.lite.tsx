import {
  onMount,
  onUnMount,
  Show,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import { variants } from "./button.css";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import { sprinkles as s } from "../../styles/sprinkles.css";
import type { ButtonProps, ButtonState } from "./button.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  const state = useStore<ButtonState>({
    loaded: false,
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.loaded = true;
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Show when={state.loaded}>
      <Box
        as="button"
        {...props.attributes}
        attributes={{
          onClick: (event) => props.onClick?.(event),
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
