import { Dispatch, SetStateAction } from "react";
import { Placement, OffsetOptions } from "@floating-ui/react";

export interface PopoverOptions {
  modal?: boolean;
  triggerType?: "hover" | "click";
  placement?: Placement;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  initialOpen?: boolean;
  offset?: OffsetOptions;
}
