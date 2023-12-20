import React, { useState, useId, forwardRef } from "react";
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
    } = props;

    const { theme } = useTheme();
    const { locale } = useLocale();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const state = useNumberFieldState({
      ...props,
      locale,
      onFocusChange(focused) {
        setIsFocused(focused);
      },
    });

    const inputRef = React.useRef(null);
    const handleRef = mergeRefs(inputRef, forwardedRef);

    const {
      labelProps,
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(props, state, inputRef);

    return (
      <Box className={props?.className} {...props.attributes}>
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
              props.inputContainer
            )}
          >
            {props.canDecrement && React.isValidElement(props.decrementButton)
              ? React.cloneElement(props.decrementButton, decrementButtonProps)
              : props?.decrementButton}

            <Box
              as="input"
              attributes={inputProps}
              ref={handleRef}
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
                props.borderless ? styles.borderless : null
              )}
            />

            {props.canIncrement && React.isValidElement(props.incrementButton)
              ? React.cloneElement(props.incrementButton, incrementButtonProps)
              : props?.incrementButton}
          </div>
        </Stack>
      </Box>
    );
  }
);

export default NumberInput;
