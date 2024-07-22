import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import * as styles from "./select-button.css";
import type { ThemeVariant } from "../../models/system.model";
import type { SelectButtonProps } from "./select-button.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<SelectButtonProps>>({
  intent: "none",
  size: "sm",
});

export default function SelectButton(props: SelectButtonProps) {
  const state = useStore<{
    theme: ThemeVariant;
    isFocused: boolean;
  }>({
    theme: "light",
    isFocused: false,
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
      {...props._css}
      className={clx(styles.buttonRoot, styles.cursor, props.className)}
      attributes={{
        ...props.attributes,
        "data-intent": props.intent ?? "none",
        "data-state": state.isFocused
          ? "focused"
          : props.disabled
            ? "disabled"
            : "default",
      }}
    >
      <button
        type="button"
        className={clx(
          styles.selectButton({
            intent: props.intent,
            size: props.size,
            theme: state.theme,
          }),
        )}
        onClick={() => props?.onClick()}
        ref={props.buttonRef}
        {...props.buttonAttributes}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-intent={props.intent ?? "none"}
        data-theme={state.theme}
        data-state={
          state.isFocused ? "focused" : props.disabled ? "disabled" : "default"
        }
        data-active={!!props.active}
        onFocus={() => {
          state.isFocused = true;
          props.buttonAttributes?.onFocus?.();
        }}
        onBlur={() => {
          state.isFocused = false;
          props.buttonAttributes?.onBlur?.();
        }}
      >
        <span className={styles.buttonContent}>
          <span {...props.valueProps}>
            {props.placeholder ?? "Select option"}
          </span>
          <Icon name="arrowDropDown" className={styles.arrowDropDown} />
        </span>
      </button>
    </Box>
  );
}
