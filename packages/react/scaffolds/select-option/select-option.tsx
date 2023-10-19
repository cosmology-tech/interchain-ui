import * as React from "react";
import clx from "clsx";
import { useListItem } from "@floating-ui/react";
import ListItem from "@/ui/list-item";
import { baseButton } from "@/ui/button/button.css";
import { SelectContext } from "../select/select.context";

export interface SelectOptionProps {
  label: string;
  children?: React.ReactNode;
  className?: string;
}

export default function SelectOption(props: SelectOptionProps) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    React.useContext(SelectContext);

  const { ref, index } = useListItem({ label: props.label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      className={clx(baseButton, props.className)}
      style={{
        padding: 0,
        display: "block",
        background: "transparent",
        textAlign: "left",
      }}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <ListItem isActive={isActive}>{props.children ?? props.label}</ListItem>
    </button>
  );
}
