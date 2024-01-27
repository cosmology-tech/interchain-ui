import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Stack from "../stack";
import FieldLabel from "../field-label";
import TextFieldAddon from "../text-field-addon";
import Icon from "../icon";
import { store } from "../../models/store";
import {
  inputStyles,
  inputSizes,
  inputIntent,
  inputRootIntent,
  clearIcon,
  rootInput,
  rootInputFocused,
  clearButton,
} from "./text-field.css";
import { validTypes, defaultInputModesForType } from "./text-field.types";
import type { ThemeVariant } from "../../models/system.model";
import type { TextFieldProps } from "./text-field.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TextField(props: TextFieldProps) {
  useDefaultProps({
    type: "text",
    size: "sm",
    intent: "default",
  });

  const state = useStore<{
    theme: ThemeVariant;
    isFocused: boolean;
    isClearable: boolean;
  }>({
    theme: "light",
    isFocused: false,
    get isClearable() {
      return (
        typeof props.onClear !== "undefined" &&
        !props.disabled &&
        typeof props.value === "string" &&
        props.value.length > 0
      );
    },
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
    <Stack
      direction="vertical"
      space="$4"
      attributes={props.attributes}
      className={props.className}
    >
      <Show when={props.label}>
        <FieldLabel
          id={props.labelId ?? `${props.id}-label`}
          htmlFor={props.id}
          label={props.label}
        />
      </Show>

      <div
        className={clx(
          rootInput,
          state.isFocused ? rootInputFocused : null,
          props.disabled
            ? inputRootIntent.disabled
            : inputRootIntent[props.intent],
          props.inputContainer
        )}
      >
        <Show when={props.startAddon}>{props.startAddon}</Show>

        <input
          {...props.inputAttributes}
          id={props.id}
          className={clx(
            inputStyles[state.theme],
            inputSizes[props.size],
            props.disabled ? inputIntent.disabled : inputIntent[props.intent],
            props.inputClassName
          )}
          autocomplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          type={validTypes[props.type]}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.inputAttributes?.onChange?.(e);
          }}
          onFocus={(e) => {
            state.isFocused = true;
            props.onFocus?.(e);
            props.inputAttributes?.onFocus?.(e);
          }}
          onBlur={(e) => {
            state.isFocused = false;
            props.onBlur?.(e);
            props.inputAttributes?.onBlur?.(e);
          }}
          placeholder={!props.disabled ? props.placeholder : undefined}
          inputMode={props.inputMode || defaultInputModesForType[props.type]}
        />

        <Show when={state.isClearable}>
          <TextFieldAddon
            position="end"
            divider={true}
            intent={props.intent}
            disabled={props.disabled}
            size={props.size}
          >
            <button
              type="button"
              className={clearButton}
              onClick={() => props.onClear?.()}
            >
              <Icon name="close" className={clearIcon} />
            </button>
          </TextFieldAddon>
        </Show>

        <Show when={props.endAddon}>{props.endAddon}</Show>
      </div>
    </Stack>
  );
}
