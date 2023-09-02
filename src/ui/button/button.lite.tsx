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
import Spinner from "../spinner";
import { store } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import type { ButtonProps } from "./button.types";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./button.css";

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  useDefaultProps({
    size: "md",
    intent: "primary",
    variant: "solid",
    spinnerPlacement: "start",
  });

  const state = useStore<{
    loaded: boolean;
    theme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
  }>({
    loaded: false,
    overrideManager: null,
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.loaded = true;
    state.theme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
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
        className={clx(
          styles.buttonSize[props.size],
          recipe({
            variant: props.variant,
            intent: props.intent,
            isDisabled: props.disabled || props.isLoading,
            theme: state.theme as ThemeVariant,
          }),
          props.className
        )}
        attributes={{
          onClick: (event) => props.onClick?.(event),
          onMouseEnter: (event) => props.onHoverStart?.(event),
          onMouseLeave: (event) => props.onHoverEnd?.(event),
          disabled: props.disabled,
          style: state.overrideManager?.applyOverrides(buttonOverrides.name),
          ...props.domAttributes,
        }}
      >
        <Show when={props.isLoading && props.spinnerPlacement === "start"}>
          <Spinner
            size={props.iconSize}
            attributes={{
              marginRight: !props.children ? "$0" : "$2",
            }}
          />
        </Show>
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
              marginLeft: !props.children ? "$0" : "$2",
            }}
          />
        </Show>
        <Show when={props.isLoading && props.spinnerPlacement === "end"}>
          <Spinner
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
