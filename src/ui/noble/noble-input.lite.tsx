import {
  onMount,
  onUnMount,
  useMetadata,
  useStore,
  useRef,
  Show,
} from "@builder.io/mitosis";
import clx from "clsx";

import Box from "../box";
import Stack from "../stack";
import FieldLabel from "../field-label";
import {
  validTypes,
  defaultInputModesForType,
} from "../text-field/text-field.types";
import { store } from "../../models/store";
import * as styles from "./noble.css";
import type { NobleInputProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleInput(props: NobleInputProps) {
  const state = useStore({
    theme: "light",
    isFocused: false,
    get inputVariantProps() {
      if (props.size === "md") {
        return {
          fontSize: "$3xl",
          fontWeight: "$semibold",
          height: "$21",
          px: "$10",
          py: "$10",
        };
      }
      return {
        fontSize: "$sm",
        fontWeight: "$normal",
        height: "$16",
        px: "$8",
        py: "$8",
      };
    },
    get borderProps() {
      const hasIntent = props.intent != null;

      const borderColorDefault = state.isFocused
        ? "$inputBorderFocus"
        : { base: "$inputBorder", hover: "$textSecondary" };

      const borderColorIntents = {
        success: "$textSuccess",
        error: "$textDanger",
      };

      return {
        borderRadius: "$lg",
        borderWidth: hasIntent ? "$base" : "$sm",
        borderStyle: "$solid",
        borderColor: hasIntent
          ? borderColorIntents[props.intent]
          : borderColorDefault,
      };
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
      space="$8"
      attributes={props.attributes}
      className={props.className}
    >
      <Box {...props.labelContainerProps}>
        <Show when={props.label && typeof props.label === "string"}>
          <FieldLabel
            id={props.labelId ?? `${props.id}-label`}
            htmlFor={props.id}
            label={props.label}
          />
        </Show>

        <Show when={props.label && typeof props.label !== "string"}>
          {props.label}
        </Show>

        <Show when={props.labelExtra}>{props.labelExtra}</Show>
      </Box>

      <Box
        position="relative"
        display="flex"
        alignItems="center"
        color="$text"
        backgroundColor="$inputBg"
        transition="all 0.2s ease-in-out"
        {...state.borderProps}
        {...state.inputVariantProps}
        {...props.inputContainerProps}
      >
        <Show when={props.startAddon}>
          <Box flexGrow={0} flexShrink={0}>
            {props.startAddon}
          </Box>
        </Show>

        <input
          {...props.inputAttributes}
          id={props.id}
          className={clx(styles.inputBase, props.inputClassName)}
          autocomplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          readOnly={props.readonly}
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
          data-size={props.size ?? "md"}
          data-disabled={props.disabled}
          data-align={props.inputTextAlign}
        />

        <Show when={props.endAddon}>{props.endAddon}</Show>
      </Box>

      <Show when={!!props.helperText}>{props.helperText}</Show>
    </Stack>
  );
}
