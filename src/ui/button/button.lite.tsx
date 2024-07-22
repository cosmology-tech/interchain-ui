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
import { fullWidth, fullWidthHeight } from "../shared/shared.css";

import type { ButtonProps } from "./button.types";
import type { ThemeVariant } from "../../models/system.model";

import * as styles from "./button.css";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ButtonProps>>({
  as: "button",
  size: "md",
  intent: "none",
  variant: "primary",
  spinnerPlacement: "start",
});

export default function Button(props: ButtonProps) {
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
    <Box
      as={props.as}
      boxRef={props.buttonRef}
      {...props.attributes}
      className={clx(
        styles.baseButton,
        styles.button({
          variant: props.variant,
          intent: props.intent,
          size: props.size,
          theme: state.theme,
        }),
        props.fluidWidth ? fullWidth : null,
        props.fluid ? fullWidthHeight : null,
        props.className,
      )}
      attributes={{
        onClick: (event) => props.onClick?.(event),
        onMouseEnter: (event) => props.onHoverStart?.(event),
        onMouseLeave: (event) => props.onHoverEnd?.(event),
        disabled: props.disabled,
        ...props.domAttributes,
      }}
    >
      <span className={styles.buttonContent}>
        <Spinner
          size={props.iconSize}
          attributes={{
            display:
              props.isLoading && props.spinnerPlacement === "start"
                ? "inline-block"
                : "none",
          }}
        />

        <Icon
          name={props.leftIcon}
          size={props.iconSize}
          attributes={{
            display:
              !!props.leftIcon && !props.isLoading ? "inline-block" : "none",
            marginRight: !props.children ? "$0" : "$2",
          }}
        />

        <Show when={!props.isLoading}>{props.children}</Show>

        <Icon
          name={props.rightIcon}
          size={props.iconSize}
          attributes={{
            display:
              !!props.rightIcon && !props.isLoading ? "inline-block" : "none",
            marginLeft: !props.children ? "$0" : "$2",
          }}
        />

        <Spinner
          size={props.iconSize}
          attributes={{
            display:
              props.isLoading && props.spinnerPlacement === "end"
                ? "inline-block"
                : "none",
          }}
        />
      </span>
    </Box>
  );
}
