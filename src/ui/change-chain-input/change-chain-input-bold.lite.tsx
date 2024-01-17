import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
  Show,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import FieldLabel from "../field-label";
import Stack from "../stack";
import Avatar from "../avatar";
import Spinner from "../spinner";
import Icon from "../icon";

import { visuallyHidden } from "../shared/shared.css";
import { baseButton } from "../button/button.css";
import * as styles from "./change-chain-input.css";

import type { ThemeVariant } from "../../models/system.model";

import {
  validTypes,
  defaultInputModesForType,
} from "../text-field/text-field.types";

import type { ChangeChainInputBoldProps } from "./change-chain-input.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ChangeChainInputBoldProps>>({
  placeholder: "Choose a chain",
});

export default function ChangeChainInputBold(props: ChangeChainInputBoldProps) {
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
          styles.rootInput[state.theme],
          props.disabled
            ? styles.inputRootIntent.disabled
            : styles.inputRootIntent[props.intent]
        )}
        data-is-focused={state.isFocused}
      >
        <div className={styles.chainItem}>
          <Show when={props.chainName}>
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                alignItems: "center",
                display: props.showSelectedItem ? "flex" : "none",
              }}
            >
              <Avatar
                name={props.chainName}
                getInitials={(name) => name[0]}
                size="xs"
                src={props.iconUrl}
              />
              <Text fontSize="$sm" fontWeight="$normal" color="$text">
                {props.chainName}
              </Text>
            </Stack>
          </Show>
        </div>

        <input
          {...props.inputAttributes}
          id={props.id}
          className={clx(
            styles.inputStyles[state.theme],
            props.disabled
              ? styles.inputIntent.disabled
              : styles.inputIntent[props.intent]
          )}
          autocomplete={props.autoComplete}
          autofocus={props.autoFocus}
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
          placeholder={
            !props.disabled && !props.chainName ? props.placeholder : undefined
          }
          inputMode={props.inputMode || defaultInputModesForType[props.type]}
        />

        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          px="$4"
          attributes={{
            "data-part-id": "dropdown-arrow",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            attributes={{
              "data-is-loading": props.isLoading,
            }}
          >
            <button
              type="button"
              className={clx(baseButton, {
                [visuallyHidden]: !props.isLoading && !props.isClearable,
              })}
              disabled={props.disabled || props.isLoading}
              style={{
                backgroundColor: "transparent",
              }}
              onClick={() => {
                if (props.isLoading) return;

                props.onClear?.();
              }}
            >
              <Box
                className={clx({
                  [visuallyHidden]: !props.isLoading,
                })}
              >
                <Spinner color="$textPlaceholder" />
              </Box>

              <Icon
                name="close"
                color="$text"
                size="$3xl"
                className={clx({
                  [visuallyHidden]: !props.chainName && !props.value,
                })}
              />
            </button>
          </Box>

          <button
            type="button"
            className={baseButton}
            disabled={props.disabled}
            style={{
              backgroundColor: "transparent",
            }}
            onClick={() => props.onDropdownArrowClicked?.()}
          >
            <Icon name="arrowDropDown" color="$text" size="$3xl" />
          </button>
        </Box>
      </div>
    </Stack>
  );
}
