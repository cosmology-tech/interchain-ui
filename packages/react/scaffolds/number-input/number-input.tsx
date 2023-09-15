import React, { useId, useEffect, forwardRef } from "react";
import clx from "clsx";
import * as numberInput from "@zag-js/number-input";
import { useMachine, normalizeProps } from "@zag-js/react";
import { NumberInputProps } from "./number-input.types";
import {
  inputStyles,
  inputSizes,
  inputIntent,
  inputRootIntent,
  rootInput,
  rootInputFocused,
} from "@/ui/text-field/text-field.css";
import useTheme from "../hooks/use-theme";
import * as styles from "./number-input.css";

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, forwardedRef) => {
    const {
      id = useId(),
      disabled,
      readOnly,
      value,
      min,
      max,
      step,
      onChange,
      onFocus,
      onBlur,
      size = "sm",
      intent = "default",
      name,
      minFractionDigits = 0,
      maxFractionDigits = 6,
    } = props;

    const { theme } = useTheme();
    const [state, send] = useMachine(
      numberInput.machine({
        id,
        disabled,
        readOnly,
        value,
        min,
        max,
        step,
        name,
        minFractionDigits,
        maxFractionDigits,
        onChange: (details) => {
          onChange?.(details);
        },
        onFocus: (details) => {
          onFocus?.(details);
        },
        onBlur: (details) => {
          onBlur?.(details);
        },
      })
    );

    const api = numberInput.connect(state, send, normalizeProps);

    useEffect(() => {
      if (!api.isFocused && value) {
        api.setValue(value);
      }
    }, [value]);

    return (
      <div {...api.rootProps} className={props?.className}>
        <div
          className={clx(
            rootInput,
            api.isFocused ? rootInputFocused : null,
            props.disabled
              ? inputRootIntent.disabled
              : inputRootIntent[props.intent],
            props.inputContainer
          )}
        >
          {props.canDecrese && React.isValidElement(props.startAddon)
            ? React.cloneElement(props.startAddon, api.decrementTriggerProps)
            : props?.startAddon}

          <input
            {...api.inputProps}
            ref={forwardedRef}
            disabled={disabled}
            id={id}
            value={value}
            className={clx(
              inputStyles[theme],
              inputSizes[size],
              props.disabled ? inputIntent.disabled : inputIntent[intent],
              props.inputClassName,
              props.borderless && styles.borderless,
              disabled && props.startAddon ? styles.withStartAddon : null,
              disabled && props.endAddon ? styles.withEndAddon : null
            )}
          />

          {props.canIncrease && React.isValidElement(props.endAddon)
            ? React.cloneElement(props.endAddon, api.decrementTriggerProps)
            : props?.endAddon}
        </div>
      </div>
    );
  }
);

export default NumberInput;
