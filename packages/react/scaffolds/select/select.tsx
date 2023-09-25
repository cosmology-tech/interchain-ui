import React from "react";
import clx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
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
  FloatingPortal,
  FloatingFocusManager,
  FloatingList,
} from "@floating-ui/react";
import useTheme from "../hooks/use-theme";
import FieldLabel from "@/ui/field-label";
import SelectButton from "@/ui/select-button";
import {
  listBoxWidthVar,
  selectRoot,
  selectButton,
  listboxStyle,
  selectFullWidth,
} from "./select.css";

const DEFAULT_LIST_WIDTH = "220";

interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue
);

function useMeasure() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        setRect({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    setRect({
      width: ref.current.getBoundingClientRect().width,
      height: ref.current.getBoundingClientRect().height,
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, rect] as [
    typeof ref,
    {
      width: number;
      height: number;
    }
  ];
}

export interface SelectProps {
  id?: string | undefined;
  fullWidth?: boolean;
  width?: number | string;
  size?: "sm" | "md" | "lg";
  label?: React.ReactNode;
  placeholder?: string;
  onSelectItem?: (index: number | null) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Select(props: SelectProps) {
  const { theme, themeClass } = useTheme();

  const [measureRef, measureRect] = useMeasure();
  const [isOpen, setIsOpen] = React.useState(false);
  const [pointer, setPointer] = React.useState(false);
  const isTypingRef = React.useRef<boolean>(false);

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
  const wrapperRef = React.useRef<HTMLDivElement>(null);
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
    <div
      ref={measureRef}
      className={clx(
        selectRoot,
        props.fullWidth ? selectFullWidth : null,
        props.className
      )}
    >
      {props.label ? (
        <FieldLabel htmlFor={props.id} label={props.label} size={props.size} />
      ) : null}

      <div ref={refs.setReference}>
        <SelectButton
          placeholder={selectedLabel || props.placeholder || "Select an option"}
          _css={{
            width: props.width
              ? typeof props.width === "number"
                ? `${props.width}px`
                : props.width
              : undefined,
          }}
          buttonAttributes={{
            tabIndex: 0,
            ...getReferenceProps(),
          }}
          className={selectButton}
        />
      </div>

      <SelectContext.Provider value={selectContext}>
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            tabIndex={-1}
            style={{
              ...floatingStyles,
              ...(isMounted ? transitionStyles : {}),
            }}
          >
            {isOpen && (
              <FloatingFocusManager context={context} modal={false}>
                <div
                  ref={wrapperRef}
                  className={clx(listboxStyle[theme], themeClass)}
                  style={assignInlineVars({
                    [listBoxWidthVar]: `max(${measureRect.width}px, ${DEFAULT_LIST_WIDTH}px)`,
                  })}
                  {...getFloatingProps({
                    onKeyDown(e) {
                      setPointer(false);

                      if (e.key === "Enter" && activeIndex !== null) {
                        handleSelect(activeIndex);
                      }

                      if (e.key === " " && !isTypingRef.current) {
                        e.preventDefault();
                      }
                    },
                    onKeyUp(e) {
                      if (e.key === " " && !isTypingRef.current) {
                        handleSelect(activeIndex);
                      }
                    },
                    onPointerMove() {
                      setPointer(true);
                    },
                  })}
                  // Ensure this element receives focus upon open so keydown works
                  tabIndex={0}
                >
                  <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {props.children}
                  </FloatingList>
                </div>
              </FloatingFocusManager>
            )}
          </div>
        </FloatingPortal>
      </SelectContext.Provider>
    </div>
  );
}
