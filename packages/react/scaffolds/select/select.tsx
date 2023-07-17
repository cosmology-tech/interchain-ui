import React from "react";
import clx from "clsx";
import type { AriaSelectProps } from "@react-types/select";
import { useSelectState } from "react-stately";
import {
  useSelect,
  HiddenSelect,
  useButton,
  mergeProps,
  useFocusRing,
} from "react-aria";
import { create } from "zustand";
import { store } from "../../models/store";

import { ListBox } from "./list-box";
import { Popover } from "./popover";

import FieldLabel from "../field-label";
import SelectButton from "../select-button";
import { selectRoot, selectButton } from "./select.css";

interface SelectOption {
  label: string;
  value: string;
}

const useStore = create(store);

export interface SelectProps<T> extends AriaSelectProps<T> {
  id?: string | undefined;
  size?: "sm" | "md" | "lg";
  options?: SelectOption[];
  className?: string;
}

export default function Select<T extends object>(props: SelectProps<T>) {
  const themeStore = useStore((state) => ({
    theme: state.theme,
    themeClass: state.themeClass,
  }));

  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = React.useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className={clx(selectRoot, props.className)}>
      <FieldLabel
        attributes={labelProps}
        label={props.label}
        htmlFor={props.id}
        size={props.size}
      />

      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />

      <SelectButton
        placeholder={
          state.selectedItem ? state.selectedItem.rendered : "Select an option"
        }
        buttonRef={ref}
        buttonAttributes={mergeProps(buttonProps, focusProps)}
        className={selectButton}
      />

      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          placement="bottom end"
          className={clx(themeStore.themeClass)}
        >
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
