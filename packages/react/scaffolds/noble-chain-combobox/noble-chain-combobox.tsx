import * as React from "react";
import clx from "clsx";
import type { ComboBoxProps } from "@react-types/combobox";
import {
  useComboBoxState,
  useSearchFieldState,
  Item,
  Section,
} from "react-stately";
import { useComboBox, useFilter, useSearchField } from "react-aria";

import Icon from "@/ui/icon";
import Box from "@/ui/box";
import type { BoxProps } from "@/ui/box/box.types";
import { ListBox } from "./list-box";
import { Popover } from "./popover";
import * as styles from "./noble-chain-combobox.css";

const DEFAULT_WIDTH: BoxProps["width"] = "$29";

interface ComboboxProps<T> extends ComboBoxProps<T> {
  defaultIsOpen?: boolean;
  styleProps?: BoxProps;
}

function useMeasure() {
  const [dimensions, setDimensions] = React.useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const previousObserver = React.useRef(null);

  const customRef = React.useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions] as const;
}

export default function NobleChainCombobox<T extends object>(
  props: ComboboxProps<T>,
) {
  const { styleProps, defaultIsOpen = true, ...comboboxProps } = props;
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...comboboxProps, defaultFilter: contains });

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const containerRef = React.useRef(null);
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
      onFocus: () => {
        console.log("focus");
        setIsFocused(true);
      },
      onBlur: () => {
        console.log("blur");
        setIsFocused(false);
      },
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  };

  const searchState = useSearchFieldState(searchProps);

  const [measureRef, dimensions] = useMeasure();

  useSearchField(searchProps, searchState, inputRef);

  React.useEffect(() => {
    if (defaultIsOpen) {
      state.open();
    }
  }, []);

  return (
    <Box
      {...styleProps}
      display="flex"
      flexDirection="column"
      position="relative"
      width={styleProps?.width ?? DEFAULT_WIDTH}
      className={clx(styleProps.className)}
    >
      <div ref={measureRef}>
        <Box
          position="relative"
          display="flex"
          height="53px"
          alignItems="center"
          backgroundColor="$inputBg"
          boxShadow="$sm"
          borderWidth="$sm"
          borderStyle="solid"
          borderColor="$inputBorder"
          borderRadius="8px"
          borderBottomLeftRadius={state.isOpen ? "$none" : "8px"}
          borderBottomRightRadius={state.isOpen ? "$none" : "8px"}
          boxRef={containerRef}
          attributes={{
            "data-focused": isFocused,
          }}
        >
          <Box
            paddingLeft="$9"
            paddingY="$9"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="magnifier" color="$textSecondary" size="$md" />
          </Box>

          <Box
            as="input"
            attributes={inputProps}
            boxRef={inputRef}
            outline="none"
            paddingX="$5"
            paddingY="$2"
            width="$full"
            border="none"
            color="$textSecondary"
            backgroundColor="$inputBg"
            transition="all 0.2s ease-in-out"
            className={clx(styles.baseInputStyles)}
          />
        </Box>
      </div>

      <Popover
        popoverRef={popoverRef}
        triggerRef={containerRef}
        state={state}
        isNonModal
        placement="bottom start"
        className={clx(styles.comboboxPopover, {
          [`${styles.hide}`]: !state.isOpen,
        })}
      >
        <ListBox
          {...listBoxProps}
          listBoxRef={listBoxRef}
          state={state}
          styleProps={{
            width: dimensions.width ? `${dimensions.width}px` : DEFAULT_WIDTH,
          }}
        />
      </Popover>
    </Box>
  );
}

NobleChainCombobox.Item = Item;
NobleChainCombobox.Section = Section;
