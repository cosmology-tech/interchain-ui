import React from "react";
import { PopoverOptions } from "./popover.types";
import { PopoverContext } from "./popover.context";
import { usePopover } from "./use-popover";

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
