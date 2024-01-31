import * as React from "react";
import clx from "clsx";
import type { ComboBoxProps } from "@react-types/combobox";
import { useComboBoxState, Item, Section } from "react-stately";
import { useComboBox, useFilter, useButton } from "react-aria";

import Icon from "@/ui/icon";
import Box from "@/ui/box";
import useTheme from "@/ui/hooks/use-theme";
import type { BoxProps } from "@/ui/box/box.types";
import { unstyledButton } from "@/ui/button/button.css";
import { inputStyles, inputSizes } from "@/ui/text-field/text-field.css";
import { ComboboxContext } from "./combobox.context";
import { ListBox } from "./list-box";
import { Popover } from "./popover";

const DEFAULT_WIDTH: BoxProps["width"] = "$29";

interface ComboboxProps<T> extends ComboBoxProps<T> {
  defaultIsOpen?: boolean;
  size?: "sm" | "md";
  styleProps?: BoxProps;
}

export default function Combobox<T extends object>(props: ComboboxProps<T>) {
  const {
    size = "sm",
    defaultIsOpen = false,
    styleProps,
    ...comboboxProps
  } = props;

  const { themeClass } = useTheme();
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...comboboxProps, defaultFilter: contains });

  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...comboboxProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  const { buttonProps } = useButton(triggerProps, buttonRef);

  React.useEffect(() => {
    if (defaultIsOpen) {
      state.open();
    }
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        size,
      }}
    >
      <Box
        {...styleProps}
        display="inline-flex"
        flexDirection="column"
        position="relative"
        width={styleProps?.width ?? DEFAULT_WIDTH}
      >
        <Box
          as="label"
          attributes={labelProps}
          display="block"
          fontSize="$sm"
          fontWeight="$medium"
          color="$textSecondary"
          textAlign="left"
          marginBottom="$4"
        >
          {props.label}
        </Box>

        <Box
          position="relative"
          display="flex"
          borderRadius="$md"
          overflow="hidden"
          boxShadow="$sm"
          borderWidth="$sm"
          borderStyle="solid"
          borderColor={state.isFocused ? "$inputBorderFocus" : "$inputBorder"}
        >
          <Box
            as="input"
            attributes={inputProps}
            ref={inputRef}
            outline="none"
            paddingX="$5"
            paddingY="$2"
            width="$full"
            border="$none"
            className={clx(inputStyles, {
              [inputSizes.sm]: size === "sm",
              [inputSizes.md]: size === "md",
            })}
          />

          <Box
            as="button"
            attributes={buttonProps}
            ref={buttonRef}
            px="$6"
            className={clx(unstyledButton)}
          >
            <Icon
              name="arrowDownS"
              size={props.size === "sm" ? "$2xl" : "$6xl"}
              domAttributes={{
                "aria-hidden": true,
              }}
            />
          </Box>
        </Box>

        {state.isOpen && (
          <Popover
            popoverRef={popoverRef}
            triggerRef={inputRef}
            state={state}
            isNonModal
            placement="bottom start"
            className={themeClass}
          >
            <Box pt="$5">
              <ListBox
                {...listBoxProps}
                listBoxRef={listBoxRef}
                state={state}
                styleProps={{
                  width: styleProps?.width ?? DEFAULT_WIDTH,
                }}
              />
            </Box>
          </Popover>
        )}
      </Box>
    </ComboboxContext.Provider>
  );
}

Combobox.Item = Item;
Combobox.Section = Section;
