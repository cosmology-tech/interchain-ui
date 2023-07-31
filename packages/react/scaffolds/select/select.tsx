import React from "react";
import clx from "clsx";
import {
  autoUpdate,
  flip,
  offset,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useClick,
  useDismiss,
  useRole,
  useTransitionStyles,
  FloatingFocusManager,
  FloatingList,
} from "@floating-ui/react";
import { create } from "zustand";
import { store } from "../../models/store";

import FieldLabel from "../field-label";
import SelectButton from "../select-button";
import { selectRoot, selectButton, listboxStyle } from "./select.css";

interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue
);

const useStore = create(store);

export interface SelectProps {
  id?: string | undefined;
  size?: "sm" | "md" | "lg";
  label: React.ReactNode;
  onSelectItem?: (index: number | null) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Select(props: SelectProps) {
  const themeStore = useStore((state) => ({
    theme: state.theme,
    themeClass: state.themeClass,
  }));

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip(), offset(8)],
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  const handleSelect = React.useCallback((index: number | null) => {
    setSelectedIndex(index);
    setIsOpen(false);
    if (index !== null) {
      if (typeof props.onSelectItem === "function") {
        props.onSelectItem(index);
      }
      setSelectedLabel(labelsRef.current[index]);
    }
  }, []);

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, typeahead, click, dismiss, role]
  );

  const selectContext = React.useMemo(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect]
  );

  return (
    <div className={clx(selectRoot, props.className)}>
      <FieldLabel htmlFor={props.id} label={props.label} size={props.size} />

      <div ref={refs.setReference}>
        <SelectButton
          placeholder={selectedLabel ?? "Select an option"}
          buttonAttributes={{
            tabIndex: 0,
            ...getReferenceProps(),
          }}
          className={selectButton}
        />
      </div>

      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                ...(isMounted ? transitionStyles : {}),
              }}
              className={listboxStyle[themeStore.theme]}
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {props.children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </div>
  );
}
