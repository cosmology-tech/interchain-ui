import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import {
  listItemBase,
  listItemActive,
  listItemSizes,
  listItemSelected,
} from "./list-item.css";
import type { ListItemProps } from "./list-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ComboboxItem(props: ListItemProps) {
  useDefaultProps({
    isActive: false,
    size: "sm",
  });

  const state = useStore<{
    theme: ThemeVariant;
  }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <div
      {...props.attributes}
      className={clx(
        listItemBase,
        props.isActive ? listItemActive.active : listItemActive.inactive,
        listItemSizes[props.size],
        props.isSelected && listItemSelected,
        props.className
      )}
      ref={props.itemRef}
    >
      {props.children}
    </div>
  );
}
