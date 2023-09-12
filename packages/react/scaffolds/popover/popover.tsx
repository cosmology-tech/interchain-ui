import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  flip,
  shift,
  useHover,
  useInteractions,
  useClick,
  arrow,
  safePolygon,
  useDismiss,
  useRole,
  Placement,
  OffsetOptions,
} from "@floating-ui/react";
import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface PopoverOptions {
  modal?: boolean;
  triggerType?: "hover" | "click";
  placement?: Placement;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  initialOpen?: boolean;
  offset?: OffsetOptions;
}

const usePopover = ({
  modal = false,
  triggerType = "hover",
  isOpen: controlledOpen,
  setIsOpen: setControlledOpen,
  initialOpen = false,
  placement = "bottom",
  offset = 5,
}: PopoverOptions) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const arrowRef = useRef(null);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const isHover = triggerType === "hover";

  const hover = useHover(data.context, {
    handleClose: safePolygon({
      buffer: -Infinity,
      blockPointerEvents: true,
    }),
    enabled: isHover,
  });

  const click = useClick(data.context, {
    enabled: !isHover,
  });

  const dismiss = useDismiss(data.context, {
    enabled: !isHover,
  });

  const role = useRole(data.context);

  const interactions = useInteractions([role, hover, click, dismiss]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      arrowRef,
      modal,
      ...data,
      ...interactions,
    }),
    [isOpen, setIsOpen, arrowRef, modal, data, interactions]
  );
};

type ContextType = ReturnType<typeof usePopover> | null;

const PopoverContext = createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }
  return context;
};

export type PopoverProps = {
  children: React.ReactNode;
} & PopoverOptions;

const Popover = ({ children, ...popoverOptions }: PopoverProps) => {
  const popover = usePopover(popoverOptions);
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

export default Popover;
