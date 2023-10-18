import React from "react";
import { usePopover } from "./use-popover";

type PopoverContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = React.createContext<PopoverContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }
  return context;
};
