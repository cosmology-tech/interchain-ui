import React, { useState, useEffect, useId, forwardRef, useMemo } from "react";
import { useNumberFieldState } from "react-stately";
import { useNumberField, useLocale, AriaNumberFieldProps } from "react-aria";
import { mergeRefs } from "@react-aria/utils";

import clx from "clsx";
import * as textFieldStyles from "@/ui/text-field/text-field.css";
import FieldLabel from "@/ui/field-label";
import Stack from "@/ui/stack";
import Box from "@/ui/box";
import TextFieldAddon from "@/ui/text-field-addon";
import useTheme from "../hooks/use-theme";
import * as styles from "./number-field.css";
import type { NumberInputProps } from "./number-field.types";

function usePrevious<T>(value: T): T {
  const ref = React.useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const defaultFormatOptions: AriaNumberFieldProps["formatOptions"] = {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 20,
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, forwardedRef) => {
    const {
      id = useId(),
      label,
      isDisabled,
      disabled,
      readOnly,
      isReadOnly,
      size,
      intent,
      clampValueOnBlur = true,
      formatOptions = defaultFormatOptions,
    } = props;

    const isFinalDisabled = isDisabled ?? disabled ?? false;
    const isFinalReadOnly = isReadOnly ?? readOnly ?? false;

    const { theme } = useTheme();
    const { locale } = useLocale();
    const [internalValue, setInternalValue] = useState<number | null>(
      () => props.value ?? props.defaultValue ?? null,
    );
    const lastValidValue = usePrevious(internalValue);

    const [strValue, setStrValue] = useState<string>(() =>
      (props.value && props.defaultValue) == null
        ? ""
        : String(props.value ?? props.defaultValue),
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const state = useNumberFieldState({
      ...props,
      locale,
      onFocusChange(focused) {
        setIsFocused(focused);
      },
    });

    useEffect(() => {
      if (props.value !== undefined) {
        setInternalValue(props.value);
      }
    }, [props.value]);

    const inputRef = React.useRef(null);
    const handleRef = mergeRefs(inputRef, forwardedRef);

    const {
      labelProps,
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(props, state, inputRef);

    const formatValue = (value: number | null): string => {
      if (value === null) return "";
      return new Intl.NumberFormat(locale, formatOptions).format(value);
    };

    const parseValue = (value: string): number | null => {
      if (value === "") {
        return null;
      }

      // Remove all non-numeric characters except decimal point and minus sign
      const numericValue = value.replace(/[^\d.-]/g, "");
      return parseFloat(numericValue);
    };

    const applyFormatting = (val: number) => {
      if (inputRef.current) {
        state.setInputValue(formatValue(val));
        inputRef.current.value = formatValue(val);
      }
    };

    const updateValue = (val: number) => {
      setInternalValue(val);
      setStrValue(formatValue(val));
      state.setNumberValue(val);
      props.onChange?.(val);
    };

    const getClampedValue = (val: number) => {
      const {
        minValue = Number.NEGATIVE_INFINITY,
        maxValue = Number.POSITIVE_INFINITY,
      } = props;

      if (typeof val !== "number") {
        val = 0;
      }

      return Math.min(Math.max(val, minValue), maxValue);
    };

    const isNotNumeric = (valStr: string) => {
      return isNaN(parseValue(valStr) ?? undefined);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let newValue = internalValue;

      // Default mode, fallback to react-aria logic
      if (clampValueOnBlur) {
        newValue = state.numberValue;
        applyFormatting(newValue);
        inputProps.onBlur?.(e);
        return;
      }

      if (!clampValueOnBlur) {
        // Snap back to the last valid numeric value
        // if the input is empty or invalid
        if (isNotNumeric(strValue)) {
          newValue = getClampedValue(0);

          if (newValue !== lastValidValue) {
            updateValue(newValue);
          }
          applyFormatting(newValue);
          inputProps.onBlur?.(e);
          return;
        } else {
          newValue = getClampedValue(parseValue(strValue));
          if (newValue !== lastValidValue) {
            updateValue(newValue);
          }
          applyFormatting(newValue);
          inputProps.onBlur?.(e);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = parseValue(e.target.value);
      const isNotNumeric = isNaN(parsedValue ?? undefined);

      // String representation of the value, always update
      setStrValue(e.target.value);

      // If the value is incomplete/invalid, don't update the state
      // wait til it's valid and update onBlur
      if (isNotNumeric) {
        return;
      }

      if (parsedValue == null) {
        setInternalValue(props.minValue ?? 0);
      } else {
        setInternalValue(parsedValue);
      }

      state.setInputValue(formatValue(parsedValue));
      state.setNumberValue(parsedValue);
      props.onChange?.(parsedValue ?? props.minValue ?? 0);
    };

    const inputValue = useMemo(() => {
      if (clampValueOnBlur) {
        return state.inputValue;
      } else if (internalValue !== null) {
        if (isNotNumeric(strValue)) {
          return strValue;
        }
        return formatValue(internalValue);
      } else {
        return strValue;
      }
    }, [state.inputValue, formatValue, internalValue, strValue]);

    const hasStartAddon = props.canDecrement && props.decrementButton != null;
    const hasEndAddon = props.canIncrement && props.incrementButton != null;

    return (
      <Box className={props.className} {...props.attributes}>
        <Stack direction="vertical" space="$4">
          {label && <FieldLabel htmlFor={id} label={label} {...labelProps} />}

          <div
            {...groupProps}
            className={clx(
              textFieldStyles.textField({
                intent: intent,
                size: size,
                theme: theme,
              }),
              props.inputContainer,
            )}
            tabIndex={props.disabled ? undefined : 0}
            data-element-type="input"
            data-intent={props.intent ?? "none"}
            data-state={
              isFocused ? "focused" : props.disabled ? "disabled" : "default"
            }
          >
            {hasStartAddon && (
              <TextFieldAddon
                position="start"
                divider={props.addonDivider ?? true}
                intent={props.intent}
                disabled={props.disabled}
              >
                {hasStartAddon && React.isValidElement(props.decrementButton)
                  ? React.cloneElement(
                      props.decrementButton,
                      decrementButtonProps,
                    )
                  : props?.decrementButton}
              </TextFieldAddon>
            )}

            <Box
              as="input"
              attributes={{
                ...inputProps,
                "data-state": isFinalReadOnly
                  ? "readonly"
                  : isFocused
                    ? "focused"
                    : isFinalDisabled
                      ? "disabled"
                      : "default",
                "data-intent": props.intent ?? "none",
                "data-theme": theme,
                readOnly: isFinalReadOnly,
                disabled: isFinalDisabled,
                value: inputValue,
                onChange: clampValueOnBlur ? inputProps.onChange : handleChange,
                onBlur: clampValueOnBlur ? inputProps.onBlur : handleBlur,
              }}
              boxRef={handleRef}
              textAlign={props.textAlign}
              fontSize={props.fontSize}
              className={clx(
                textFieldStyles.input,
                isFinalDisabled && props.decrementButton
                  ? styles.withDecrementButton
                  : null,
                isFinalDisabled && props.incrementButton
                  ? styles.withIncrementButton
                  : null,
                props.borderless ? styles.borderless : null,
                props.inputClassName,
              )}
            />

            <div
              className={textFieldStyles.borderElement}
              data-theme={theme}
              data-intent={props.intent ?? "none"}
              data-state={
                isFocused ? "focused" : props.disabled ? "disabled" : "default"
              }
            />

            {hasEndAddon && (
              <TextFieldAddon
                position="end"
                divider={props.addonDivider ?? true}
                intent={props.intent}
                disabled={props.disabled}
              >
                {hasEndAddon && React.isValidElement(props.incrementButton)
                  ? React.cloneElement(
                      props.incrementButton,
                      incrementButtonProps,
                    )
                  : props?.incrementButton}
              </TextFieldAddon>
            )}
          </div>
        </Stack>
      </Box>
    );
  },
);

export default NumberInput;
