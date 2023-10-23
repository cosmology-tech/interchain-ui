import React, { useId, forwardRef } from "react";
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
import FieldLabel from "@/ui/field-label";
import Stack from "@/ui/stack";
import Box from "@/ui/box";
import useTheme from "../hooks/use-theme";
import * as styles from "./number-input.css";

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, forwardedRef) => {
    const {
      id = useId(),
      label,
      disabled,
      readOnly,
      value,
      min,
      max,
      step,
      onChange,
      onFocus,
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
        formatOptions: {
          maximumFractionDigits: maxFractionDigits,
          minimumFractionDigits: minFractionDigits,
        },
        onValueChange: onChange,
        onFocusChange: onFocus,
      })
    );

    const api = numberInput.connect(state, send, normalizeProps);

    return (
      <div {...api.rootProps} className={props?.className}>
        <Stack direction="vertical" space="$4">
          {label && (
            <FieldLabel htmlFor={id} label={label} {...api.labelProps} />
          )}

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

            <Box
              as="input"
              attributes={{
                ...api.inputProps,
                id,
                disabled,
                value,
              }}
              ref={forwardedRef}
              textAlign={props.textAlign}
              fontSize={props.fontSize}
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
        </Stack>
      </div>
    );
  }
);

export default NumberInput;
