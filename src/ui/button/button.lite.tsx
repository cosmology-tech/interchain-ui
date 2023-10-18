import {
  useDefaultProps,
  onMount,
  onUnMount,
  Show,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import Spinner from "../spinner";
import { store } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import { isDefaultAccent, getAccentHover } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";

import type { UnknownRecord } from "type-fest";
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
    theme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
    getVars: () => UnknownRecord;
  }>({
    overrideManager: null,
    theme: "light",
    getVars() {
      const isDefaultAppearance =
        isDefaultAccent(state.themeAccent) && state.themeAccent === "blue";

      // Only allow accent customization for 'primary' Intent
      const isPrimaryIntent = props.intent === "primary";

      return isDefaultAppearance || !isPrimaryIntent
        ? state.overrideManager?.applyOverrides(buttonOverrides.name)
        : assignInlineVars({
            [styles.buttonBgVar]: themeVars.colors.accent,
            [styles.buttonTextColorVar]: themeVars.colors.accentText,
            [styles.buttonHoverBgVar]: getAccentHover(themeVars.colors.accent),
          });
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.themeAccent = store.getState().themeAccent;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
      state.themeAccent = newState.themeAccent;
      state.overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      as="button"
      ref={props.ref}
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
        style: state.getVars(),
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
  );
}
