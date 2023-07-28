import {
  useDefaultProps,
  onMount,
  onUnMount,
  Show,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import { getSize, recipe } from "./button.helper";
import type { ButtonProps, ButtonState } from "./button.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  useDefaultProps({
    size: "md",
    intent: "primary",
    variant: "solid",
  });

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
        {...getSize(props.size)}
        {...props.attributes}
        className={clx(
          recipe({
            variant: props.variant,
            intent: props.intent,
            isDisabled: props.disabled,
            theme: state.theme,
          }),
          props.className
        )}
        attributes={{
          onClick: (event) => props.onClick?.(event),
          onMouseEnter: (event) => props.onHoverStart?.(event),
          onMouseLeave: (event) => props.onHoverEnd?.(event),
          disabled: props.disabled,
          ...props.domAttributes,
        }}
      >
        <Show when={!!props.leftIcon}>
          <Icon
            name={props.leftIcon}
            size={props.iconSize}
            attributes={{
              marginRight: !props.children ? "$0" : "$2",
            }}
          />
        </Show>

        {props.children}

        <Show when={!!props.rightIcon}>
          <Icon
            name={props.rightIcon}
            size={props.iconSize}
            attributes={{
              marginRight: !props.children ? "$0" : "$2",
            }}
          />
        </Show>
      </Box>
    </Show>
  );
}
