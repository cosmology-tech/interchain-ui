import {
  useMetadata,
  useStore,
  useDefaultProps,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import clx from "clsx";

import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import { baseButton } from "../button/button.css";
import type {
  NobleButtonProps,
  NobleButtonVariant,
  NobleButtonSize,
} from "./noble.types";
import type { BoxProps } from "../box/box.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NobleButtonProps>>({
  size: "lg",
  variant: "solid",
});

export default function NobleButton(props: NobleButtonProps) {
  const state = useStore({
    theme: "light",
    get variantStyles() {
      const variantStylesMap: Record<NobleButtonVariant, BoxProps> = {
        solid: {
          bg: { base: "$primary", hover: "$blue700" },
          color: "$white",
          ...state.getSizeStyles(props.size),
          ...state.getDisabledStyles(),
        },
        text: {
          bg: "transparent",
          color: "$textSecondary",
          fontSize: "$sm",
          fontWeight: "$normal",
          lineHeight: "$base",
        },
      };

      return variantStylesMap[props.variant];
    },
    getDisabledStyles() {
      const isLightTheme = state.theme === "light";
      return props.disabled
        ? ({
            bg: isLightTheme
              ? { base: "$gray700", hover: "$gray700" }
              : { base: "$blue100", hover: "$blue100" },
            color: isLightTheme ? "$gray600" : "$blue400",
            cursor: "not-allowed",
          } as BoxProps)
        : {};
    },
    getSizeStyles(size: NobleButtonSize) {
      const sizeStylesMap: Record<NobleButtonSize, BoxProps> = {
        sm: {
          height: "38px",
          px: "$7",
          py: "$5",
          borderRadius: "$base",
          fontSize: "$sm",
        },
        lg: {
          height: "$17",
          width: "$full",
          borderRadius: "$md",
          fontSize: "$lg",
        },
      };

      return sizeStylesMap[size];
    },
  });

  let cleanupRef = useRef<(() => void) | null>(null);

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
      as="button"
      {...state.variantStyles}
      {...props}
      {...props.attributes}
      className={clx(baseButton, props.className)}
      attributes={{
        ...props.domAttributes,
        onClick: props.disabled ? undefined : (event) => props.onClick?.(event),
      }}
    >
      <Icon
        name={props.leftIcon}
        size={props.iconSize}
        attributes={{
          display: !!props.leftIcon ? "inline-block" : "none",
          marginRight: !props.children ? "$0" : "$2",
        }}
      />

      {props.children}

      <Icon
        name={props.rightIcon}
        size={props.iconSize}
        attributes={{
          display: !!props.rightIcon ? "inline-block" : "none",
          marginLeft: !props.children ? "$0" : "$2",
        }}
      />
    </Box>
  );
}
