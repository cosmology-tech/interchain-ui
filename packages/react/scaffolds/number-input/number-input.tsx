import React, { useMemo, useId, useState, useEffect, forwardRef } from "react";
import BigNumber from "bignumber.js";
import clx from "clsx";
import { create } from "zustand";
import * as numberInput from "@zag-js/number-input";
import { useMachine, normalizeProps } from "@zag-js/react";
import { NumberInputProps } from "./number-input.types";
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
} from "../text-field/text-field.css";
// import {
//   fieldLabelSizes,
//   fieldlabelStyle,
// } from "../field-label/field-label.css";
import * as styles from "./number-input.css";

const useStore = create(store);

const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  (props, forwardedRef) => {
    const themeStore = useStore((state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
    }));
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
      precision,
      minFractionDigits = 0,
      maxFractionDigits = 6,
    } = props;
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
        precision,
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
      // const isLastDecimal = value?.substring(value?.length - 1) === ".";
      // if (new BigNumber(value).gt(max)) {
      //   api.setToMax();
      // } else if (new BigNumber(value).lt(min)) {
      //   api.setToMin();
      // } else if (!isLastDecimal && typeof value !== "undefined") {
      //   api.setValue(value);
      // }
      // api.setValue(value);
      if(!api.isFocused) {
        api.setValue(value);
      }
    }, [value]);

    return (
      <div {...api.rootProps} className={props?.className}>
        {/* {props.label && (
          <label
            {...api.labelProps}
            className={clx(fieldlabelStyle, fieldLabelSizes[props.size])}
            style={{ marginBottom: 8 }}
          >
            {props.label}
          </label>
        )} */}

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
            {props?.canDecrese && props.startAddon
              ? React.cloneElement(props.startAddon, api.decrementTriggerProps)
              : props?.startAddon}
          <input
            {...api.inputProps}
            disabled={disabled}
            id={id}
            className={clx(
              inputStyles[themeStore.theme],
              inputSizes[size],
              props.disabled ? inputIntent.disabled : inputIntent[intent],
              props.inputClassName,
              props.borderless && styles.borderless
            )}
          />
          {props?.canIncrease && props.endAddon
            ? React.cloneElement(props.endAddon, api.decrementTriggerProps)
            : props?.endAddon}
        </div>
      </div>
    );
  }
);

export default NumberInput;
