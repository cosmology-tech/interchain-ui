import * as React from "react";
import clx from "clsx";
import {
  autoUpdate,
  size,
  flip,
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
} from "@floating-ui/react";
import { create } from "zustand";
import { store } from "../../models/store";

import Box from "../box";
import ChangeChainInput from "../change-chain-input";
import ChangeChainListItem from "../change-chain-list-item";
import { changeChainListBox } from "./change-chain-combobox.css";
import { listboxStyle } from "../select/select.css";
import type { ChainListItemProps } from "../change-chain-list-item/change-chain-list-item.types";

const useStore = create(store);

interface ItemProps {
  isActive: boolean;
  size: ChainListItemProps["size"];
  // ====
  iconUrl?: ChainListItemProps["iconUrl"];
  chainName: ChainListItemProps["chainName"];
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { isActive, size, iconUrl, chainName, ...rest } = props;
  const id = useId();

  return (
    <div ref={ref} role="option" id={id} aria-selected={isActive} {...rest}>
      <ChangeChainListItem
        isActive={isActive}
        size={size}
        iconUrl={iconUrl}
        chainName={chainName}
      />
    </div>
  );
});

type ComboboxOption = Omit<ItemProps, "isActive" | "size">;

export interface ChainSwapComboboxProps {
  id?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  label?: string;
  size: ChainListItemProps["size"];
  options: Array<ComboboxOption>;
  filterFn?: (options: Array<ComboboxOption>) => Array<ComboboxOption>;
  defaultSelected?: ComboboxOption;
  onItemSelected?: (selected: ComboboxOption) => void;
  defaultOpen?: boolean;
  valueItem?: ComboboxOption;
}

export default function ChainSwapCombobox(props: ChainSwapComboboxProps) {
  const themeStore = useStore((state) => ({
    theme: state.theme,
    themeClass: state.themeClass,
  }));

  const [open, setOpen] = React.useState(!!props.defaultOpen);
  const [showInputValue, setShowInputValue] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    props.defaultSelected?.chainName ?? ""
  );
  const [selectedItem, setSelectedItem] = React.useState<ComboboxOption | null>(
    props.defaultSelected ?? null
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const listRef = React.useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip(),
      offset(8),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const focus = useFocus(context, {
    keyboardOnly: false,
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
    console.log("change", value);
    setInputValue(value);
    setShowInputValue(true);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  function defaultFilterOptions(options: Array<ComboboxOption>) {
    return options.filter((item) =>
      item?.chainName?.toLowerCase().startsWith(inputValue?.toLowerCase())
    );
  }

  const items = React.useMemo(() => {
    if (!inputValue) return props.options;

    return typeof props.filterFn === "function"
      ? props.filterFn(props.options)
      : defaultFilterOptions(props.options);
  }, [inputValue, props.options]);

  React.useEffect(() => {
    if (props.valueItem) {
      setSelectedItem(props?.valueItem);
    }
    setInputValue(props?.valueItem?.chainName);
  }, [props.valueItem]);

  return (
    <Box>
      <div ref={refs.setReference}>
        <ChangeChainInput
          size={props.size}
          label={props.label}
          value={showInputValue ? inputValue : ""}
          iconUrl={!selectedItem ? "" : selectedItem?.iconUrl}
          chainName={!selectedItem ? "" : selectedItem?.chainName}
          isClearable={!!selectedItem || inputValue}
          onClear={() => {
            setInputValue("");
            setSelectedItem(null);
          }}
          onDropdownArrowClicked={() => {
            setOpen((isPrevOpen) => !isPrevOpen);
          }}
          inputAttributes={getReferenceProps({
            onChange,
            "aria-autocomplete": "list",
            onFocus() {
              if (selectedItem) {
                setShowInputValue(false);
              } else {
                setShowInputValue(true);
              }
            },
            onBlur() {
              setShowInputValue(false);
              setActiveIndex(null);
              setInputValue("");
            },
            onKeyDown(event) {
              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                const selected = items[activeIndex];
                setInputValue(selected.chainName);
                setActiveIndex(null);
                setSelectedItem(selected);
                setShowInputValue(false);
                setOpen(false);
                props.onItemSelected?.(selected);
              }
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
              changeChainListBox[themeStore.theme],
              listboxStyle[themeStore.theme]
            )}
          >
            <FloatingList elementsRef={listRef}>
              {items.map((item, index) => (
                <Item
                  key={item.chainName}
                  size={props.size}
                  isActive={activeIndex === index}
                  {...item}
                  {...getItemProps({
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick() {
                      setInputValue(item.chainName);
                      setOpen(false);
                      setShowInputValue(false);
                      setSelectedItem(item);
                      props.onItemSelected?.(item);
                      refs.domReference.current?.focus();
                    },
                  })}
                />
              ))}
            </FloatingList>
          </div>
        </FloatingFocusManager>
      )}
    </Box>
  );
}
