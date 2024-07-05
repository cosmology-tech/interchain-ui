import React, { useState, useEffect, useId, forwardRef } from "react";
import { useNumberFieldState } from "react-stately";
import { useNumberField, useLocale } from "react-aria";
import { mergeRefs } from "@react-aria/utils";

import clx from "clsx";
import {
  inputStyles,
  inputSizes,
  inputIntent,
  inputRootIntent,
  rootInput,
  rootInputFocused,
} from "@/ui/text-field/text-field.css";
import FieldLabel from "@/ui/field-label";
import Stack from "@/ui/stack";
import Box from "@/ui/box";
import useTheme from "../hooks/use-theme";
import * as styles from "./number-field.css";
import type { NumberInputProps } from "./number-field.types";

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, forwardedRef) => {
    const {
      id = useId(),
      label,
      isDisabled,
      size = "sm",
      intent = "default",
      clampValueOnBlur = true,
    } = props;

    const { theme } = useTheme();
    const { locale } = useLocale();
    const [internalValue, setInternalValue] = useState<number | null>(
      props.defaultValue ?? null,
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const state = useNumberFieldState({
      ...props,
      locale,
      onChange: (value) => {
        setInternalValue(value);
      },
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
      return new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
      }).format(value);
    };

    const parseValue = (value: string): number | null => {
      if (value === "") {
        // Since it's a number field, returns a number if the input is empty
        return props.minValue ?? 0;
      }

      // Remove all non-numeric characters except decimal point and minus sign
      const numericValue = value.replace(/[^\d.-]/g, "");
      return parseFloat(numericValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let newValue = internalValue;

      if (clampValueOnBlur && internalValue !== null) {
        const { minValue, maxValue } = props;

        if (typeof minValue === "number" && newValue < minValue) {
          newValue = minValue;
        } else if (typeof maxValue === "number" && newValue > maxValue) {
          newValue = maxValue;
        }

        if (newValue !== internalValue) {
          setInternalValue(newValue);
          state.setNumberValue(newValue);
          props.onChange?.(newValue);
        }
      }

      // Apply formatting on blur
      if (inputRef.current) {
        state.setInputValue(formatValue(newValue));
        inputRef.current.value = formatValue(newValue);
      }

      inputProps.onBlur?.(e);
    };

    const inputValue = props.clampValueOnBlur
      ? state.inputValue
      : internalValue !== null
        ? formatValue(internalValue)
        : "0";

    return (
      <Box className={props.className} {...props.attributes}>
        <Stack direction="vertical" space="$4">
          {label && <FieldLabel htmlFor={id} label={label} {...labelProps} />}

          <div
            {...groupProps}
            className={clx(
              rootInput,
              isFocused ? rootInputFocused : null,
              props.isDisabled
                ? inputRootIntent.disabled
                : inputRootIntent[props.intent],
              props.inputContainer,
            )}
          >
            {props.canDecrement && React.isValidElement(props.decrementButton)
              ? React.cloneElement(props.decrementButton, decrementButtonProps)
              : props?.decrementButton}

            <Box
              as="input"
              attributes={{
                ...inputProps,
                value: inputValue,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const parsedValue = parseValue(e.target.value);
                  setInternalValue(parsedValue);

                  inputRef.current.value = formatValue(parsedValue);
                  state.setInputValue(formatValue(parsedValue));
                  state.setNumberValue(parsedValue);
                  props.onChange?.(parsedValue);
                },
                onBlur: handleBlur,
              }}
              boxRef={handleRef}
              textAlign={props.textAlign}
              fontSize={props.fontSize}
              className={clx(
                inputStyles[theme],
                inputSizes[size],
                props.isDisabled ? inputIntent.disabled : inputIntent[intent],
                props.inputClassName,
                isDisabled && props.decrementButton
                  ? styles.withDecrementButton
                  : null,
                isDisabled && props.incrementButton
                  ? styles.withIncrementButton
                  : null,
                props.borderless ? styles.borderless : null,
              )}
            />

            {props.canIncrement && React.isValidElement(props.incrementButton)
              ? React.cloneElement(props.incrementButton, incrementButtonProps)
              : props?.incrementButton}
          </div>
        </Stack>
      </Box>
    );
  },
);

export default NumberInput;
