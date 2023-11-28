import * as React from "react";
import clx, { ClassValue } from "clsx";
import {
  autoUpdate,
  size,
  offset,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useFocus,
  useTransitionStyles,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from "@floating-ui/react";
import { create } from "zustand";
import { store } from "@/models/store";

import Box from "@/ui/box";
import ChainSwapInput from "@/ui/chain-swap-input";
import ChainListItem from "@/ui/chain-list-item";
import { chainSwapListBox } from "./chain-swap-combobox.css";
import type { ChainListItemProps } from "@/ui/chain-list-item/chain-list-item.types";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";

const useStore = create(store);

interface ItemProps {
  isActive: boolean;
  isSelected: boolean;
  size: ChainListItemProps["size"];
  // ====
  iconUrl?: ChainListItemProps["iconUrl"];
  name: ChainListItemProps["name"];
  tokenName: ChainListItemProps["tokenName"];
  amount?: ChainListItemProps["amount"];
  notionalValue?: ChainListItemProps["notionalValue"];
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const {
    isActive,
    size,
    iconUrl,
    name,
    tokenName,
    amount,
    notionalValue,
    isSelected,
    ...rest
  } = props;
  const id = useId();

  return (
    <div ref={ref} role="option" id={id} aria-selected={isActive} {...rest}>
      <ChainListItem
        isActive={isActive}
        size={size}
        iconUrl={iconUrl}
        name={name}
        tokenName={tokenName}
        amount={amount}
        notionalValue={notionalValue}
        isSelected={isSelected}
      />
    </div>
  );
});

type ComboboxOption = Omit<ItemProps, "isActive" | "size" | "isSelected">;

export interface ChainSwapComboboxProps {
  size: ChainListItemProps["size"];
  maxHeight?: number;
  options: Array<ComboboxOption>;
  filterFn?: (options: Array<ComboboxOption>) => Array<ComboboxOption>;
  defaultSelected?: ComboboxOption;
  onItemSelected?: (selected: ComboboxOption) => void;
  defaultOpen?: boolean;
  endAddon?: React.ReactNode | undefined;
  valueItem: ComboboxOption;
  className?: ClassValue;
  inputClassName?: string;
  attributes?: Sprinkles;
}

export default function ChainSwapCombobox(props: ChainSwapComboboxProps) {
  const themeStore = useStore((state) => ({
    theme: state.theme,
    themeClass: state.themeClass,
  }));

  const [open, setOpen] = React.useState(!!props.defaultOpen);
  const [inputFocusing, setInputFocusing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    props.defaultSelected?.tokenName ?? ""
  );
  const [selectedItem, setSelectedItem] = React.useState<ComboboxOption | null>(
    props.defaultSelected ?? null
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    placement: "bottom-start",
    onOpenChange: setOpen,
    middleware: [
      offset(({ rects }) => {
        const containerX = containerRef.current.getBoundingClientRect().left;
        const referenceX = rects.reference.x;

        return {
          crossAxis: containerX - referenceX,
        };
      }),
      size({
        apply({ rects, availableHeight, elements }) {
          const containerWidth =
            containerRef.current.getBoundingClientRect().width;
          Object.assign(elements.floating.style, {
            width: `${containerWidth}px`,
            maxHeight: `${props.maxHeight ?? availableHeight}px`,
          });
        },
      }),
    ],
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const focus = useFocus(context, {
    visibleOnly: false,
  });
  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, focus, dismiss, listNav]
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  function defaultFilterOptions(options: Array<ComboboxOption>) {
    // Return all items when inputValue is empty string or input not focusing
    if (!inputValue || !inputFocusing) {
      return options;
    }
    return options.filter((item) =>
      item?.tokenName?.toLowerCase().startsWith(inputValue?.toLowerCase())
    );
  }

  function handleEmptyInputEscape() {
    if (inputValue === "" && selectedItem) {
      setInputValue(selectedItem.tokenName);
    }
  }

  const items =
    typeof props.filterFn === "function"
      ? props.filterFn(props.options)
      : defaultFilterOptions(props.options);

  React.useEffect(() => {
    if (!inputFocusing) {
      setSelectedItem(props?.valueItem);
      setInputValue(props?.valueItem?.tokenName);
    }
  }, [props.valueItem]);

  // Make sure onBlur can reset value to the selectedItem
  React.useEffect(() => {
    if (!open && selectedItem && !inputFocusing) {
      setInputValue(selectedItem.tokenName);
    }
  }, [open, selectedItem, inputValue]);

  return (
    <Box
      pr="$9"
      pl="$9"
      py="$7"
      backgroundColor="$menuItemBg"
      ref={containerRef}
      {...props.attributes}
      className={props.className}
    >
      <div data-part-id="chain-swap-combobox-reference" ref={refs.setReference}>
        <ChainSwapInput
          size={props.size}
          value={inputValue}
          onDropdownArrowClicked={() => {
            setOpen((isPrevOpen) => !isPrevOpen);
          }}
          endAddon={props.endAddon}
          {...selectedItem}
          label={selectedItem?.name ?? null}
          inputClassName={props.inputClassName}
          inputAttributes={getReferenceProps({
            onChange,
            value: inputValue,
            "aria-autocomplete": "list",
            onKeyDown(event) {
              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                const selected = items[activeIndex];
                setInputValue(selected.tokenName);
                setActiveIndex(null);
                setSelectedItem(selected);
                setOpen(false);
                props.onItemSelected?.(selected);
              }

              if (event.key === "Escape") {
                handleEmptyInputEscape();
              }
            },
            onFocus() {
              setInputFocusing(true);
              setInputValue("");
            },
            onBlur(e) {
              setInputFocusing(false);
              handleEmptyInputEscape();
            },
          })}
        />
      </div>

      {open && (
        <FloatingFocusManager
          context={context}
          initialFocus={-1}
          visuallyHiddenDismiss
        >
          <FloatingPortal>
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                  ...(isMounted ? transitionStyles : {}),
                  overflowY: "auto",
                },
              })}
              className={clx(
                themeStore.themeClass,
                chainSwapListBox[themeStore.theme]
              )}
            >
              <FloatingList elementsRef={listRef}>
                {items.map((item, index) => (
                  <Item
                    key={item.tokenName}
                    size={props.size}
                    isActive={activeIndex === index}
                    isSelected={item.tokenName === selectedItem?.tokenName}
                    {...item}
                    {...getItemProps({
                      ref(node) {
                        listRef.current[index] = node;
                      },
                      onClick() {
                        setInputValue(item.tokenName);
                        setOpen(false);
                        if (item) {
                          setSelectedItem(item);
                          props.onItemSelected?.(item);
                        }
                        refs.domReference.current?.focus();
                      },
                    })}
                  />
                ))}
              </FloatingList>
            </div>
          </FloatingPortal>
        </FloatingFocusManager>
      )}
    </Box>
  );
}
