import clx from "clsx";
import { comboboxItem, comboboxItemActive } from "./combobox-item.css";
import type { ComboboxItemProps } from "./combobox-item.types";

export default function ComboboxItem(props: ComboboxItemProps) {
  return (
    <li
      {...props.attributes}
      className={clx(
        comboboxItem,
        props.isActive ? comboboxItemActive : null,
        props.className
      )}
    >
      {props.children}
    </li>
  );
}
