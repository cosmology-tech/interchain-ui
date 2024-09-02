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
import { store, UIState } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import { isDefaultAccent, getAccentHover } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";
import { fullWidth, fullWidthHeight } from "../shared/shared.css";

import type { UnknownRecord } from "../../helpers/types";
import type { ButtonProps } from "./button.types";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";

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
  intent: "primary",
  variant: "solid",
  spinnerPlacement: "start",
});

export default function Button(props: ButtonProps) {
  const state = useStore<{
    _theme: ThemeVariant;
    _themeAccent: UIState["themeAccent"];
    _overrideManager: OverrideStyleManager | null;
    getVars: () => UnknownRecord;
    getStoreState: () => any;
    combinedClassName: string;
    spreadAttributes: UnknownRecord;
  }>({
    _overrideManager: null,
    _theme: "light",
    _themeAccent: null,
    getStoreState() {
      // This seems weird but it's a workaround for one minor bug from mitosis
      // If we have any variables in any function scope that has the same name as the store state, mitosis understands that it's the same variable
      // and will attempt to transform those unwanted/unrelated variables into the ones in the state.<variable>
      // So we need to name these values differently (e.g. _keyA: valueA) or inverse
      return {
        theme: store.getState().theme,
        themeAccent: store.getState().themeAccent,
        overrideStyleManager: store.getState().overrideStyleManager,
      };
    },
    getVars() {
      const accent = state._themeAccent;
      const isDefaultAppearance = isDefaultAccent(accent) && accent === "blue";

      // Only allow accent customization for 'primary' Intent
      const isPrimaryIntent = props.intent === "primary";

      return isDefaultAppearance || !isPrimaryIntent
        ? state._overrideManager?.applyOverrides(buttonOverrides.name)
        : assignInlineVars({
            [styles.buttonBgVar]: themeVars.colors.accent,
            [styles.buttonTextColorVar]: themeVars.colors.accentText,
            [styles.buttonHoverBgVar]: getAccentHover(themeVars.colors.accent),
          });
    },
    get combinedClassName() {
      return clx(
        styles.buttonSize[props.size],
        recipe({
          as: props.as,
          variant: props.variant,
          intent: props.intent ?? "primary",
          isDisabled: props.disabled || props.isLoading,
          theme: state.getStoreState().theme,
        }),
        props.fluidWidth ? fullWidth : null,
        props.fluid ? fullWidthHeight : null,
        props.className,
      );
    },
    get spreadAttributes() {
      return Object.assign(
        {
          as: props.as,
        },
        {
          attributes: {
            ...props.attributes,
            onClick: (event) => props.onClick?.(event),
            onMouseEnter: (event) => props.onHoverStart?.(event),
            onMouseLeave: (event) => props.onHoverEnd?.(event),
            disabled: props.disabled,
            // style: state.getVars(),
            ...props.domAttributes,
          },
        },
      );
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    const uiStore = state.getStoreState();

    state._theme = uiStore[0];
    state._themeAccent = uiStore[1];
    state._overrideManager = uiStore[2];

    cleanupRef = store.subscribe((newState, prevState) => {
      state._theme = newState.theme;
      state._themeAccent = newState.themeAccent;
      state._overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return (
    <Box
      boxRef={props.buttonRef}
      className={state.combinedClassName}
      {...state.spreadAttributes}
    >
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
    </Box>
  );
}
