import React from "react";
import { useInteractions } from "@floating-ui/react";

export interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue
);
