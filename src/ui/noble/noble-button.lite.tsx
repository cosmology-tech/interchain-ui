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
    get buttonProps() {
      const { leftIcon, rightIcon, iconSize, variant, size, ...otherProps } =
        props;
      return otherProps;
    },
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
        outlined: {
          color: "$text",
          bg: "$cardBg",
          borderRadius: "$lg",
          borderWidth: "1px",
          borderStyle: "$solid",
          borderColor: "$progressBg",
          fontSize: "$md",
          fontWeight: "$normal",
          lineHeight: "$base",
          ...state.getSizeStyles(props.size),
          ...state.getDisabledStyles(),
        },
        tag: {
          bg: props.isActive
            ? state.theme === "light"
              ? "$gray400"
              : "$blue700"
            : {
                base: "$progressBg",
                hover: state.theme === "light" ? "$gray600" : "$blue200",
                active: state.theme === "light" ? "$gray400" : "$blue700",
              },
          color: props.isActive
            ? state.theme === "light"
              ? "$textInverse"
              : "$blue200"
            : {
                base: state.theme === "light" ? "$gray400" : "$textSecondary",
                hover: state.theme === "light" ? "$gray400" : "$textSecondary",
                active: state.theme === "light" ? "$textInverse" : "$blue200",
              },
          borderRadius: "$base",
          fontWeight: "$semibold",
          lineHeight: "$base",
          ...state.getSizeStyles(props.size),
          ...state.getDisabledStyles(),
        },
      };

      return variantStylesMap[props.variant];
    },
    getDisabledStyles() {
      const isLightTheme = state.theme === "light";

      if (props.variant === "solid") {
        return props.disabled
          ? ({
              bg: isLightTheme
                ? { base: "$gray700", hover: "$gray700" }
                : { base: "$blue100", hover: "$blue100" },
              color: isLightTheme ? "$gray600" : "$blue400",
              cursor: "not-allowed",
            } as BoxProps)
          : {};
      }

      if (props.variant === "tag") {
        return props.disabled
          ? ({
              opacity: 0.5,
              cursor: "not-allowed",
            } as BoxProps)
          : {};
      }
      // For text and outlined variants
      return props.disabled
        ? ({
            bg: "$transparent",
            color: "$progressBg",
            cursor: "not-allowed",
          } as BoxProps)
        : {};
    },
    getSizeStyles(size: NobleButtonSize) {
      const sizeStylesMap: Record<NobleButtonSize, BoxProps> = {
        xs: {
          height: "$11",
          px: "$4",
          py: "$2",
          borderRadius: "$base",
          fontSize: "$sm",
        },
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
        xl: {
          height: "$21",
          p: "$10",
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
      {...state.buttonProps}
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
