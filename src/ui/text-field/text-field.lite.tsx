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
import * as styles from "./text-field.css";
import {
  validTypes,
  defaultInputModesForType,
  RenderAsTextareaProps,
} from "./text-field.types";
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
          styles.textField({
            intent: props.intent,
            size: props.size,
            theme: state.theme,
          }),
          props.inputContainer,
        )}
        tabIndex={props.disabled ? undefined : 0}
        data-element-type={props.as}
        data-intent={props.intent ?? "none"}
        data-state={
          state.isFocused ? "focused" : props.disabled ? "disabled" : "default"
        }
      >
        <Show when={props.startAddon}>
          <TextFieldAddon
            position="start"
            divider={props.addonDivider ?? true}
            intent={props.intent}
            disabled={props.disabled}
          >
            {props.startAddon}
          </TextFieldAddon>
        </Show>

        <Show when={props.as === "input"}>
          <input
            {...props.inputAttributes}
            id={props.id}
            className={clx(styles.input, props.inputClassName)}
            autocomplete={props.autoComplete}
            autoFocus={props.autoFocus}
            readOnly={props.readonly}
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
            data-intent={props.intent ?? "none"}
            data-theme={state.theme}
          />
        </Show>

        <Show when={props.as === "textarea"}>
          <textarea
            {...props.inputAttributes}
            id={props.id}
            className={clx(styles.input, props.inputClassName)}
            autocomplete={props.autoComplete}
            autoFocus={props.autoFocus}
            readOnly={props.readonly}
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
            data-intent={props.intent ?? "none"}
            data-theme={state.theme}
            // textarea specific props
            rows={(props as RenderAsTextareaProps).rows}
            cols={(props as RenderAsTextareaProps).cols ?? 3}
            wrap={(props as RenderAsTextareaProps).wrap}
            style={{
              ...props?.inputAttributes?.style,
              resize: (props as RenderAsTextareaProps).resize,
            }}
          />
        </Show>

        <div
          className={styles.borderElement}
          data-theme={state.theme}
          data-intent={props.intent ?? "none"}
          data-state={
            state.isFocused
              ? "focused"
              : props.disabled
                ? "disabled"
                : "default"
          }
        />

        <Show when={state.isClearable}>
          <TextFieldAddon
            position="end"
            divider={props.addonDivider ?? true}
            intent={props.intent}
            disabled={props.disabled}
          >
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => props.onClear?.()}
            >
              <Icon name="close" className={styles.clearIcon} />
            </button>
          </TextFieldAddon>
        </Show>

        <Show when={props.endAddon}>
          <TextFieldAddon
            position="end"
            divider={props.addonDivider ?? true}
            intent={props.intent}
            disabled={props.disabled}
          >
            {props.endAddon}
          </TextFieldAddon>
        </Show>
      </div>
    </Stack>
  );
}
