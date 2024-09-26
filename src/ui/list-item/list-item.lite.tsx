import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import { listItem } from "./list-item.css";
import type { ListItemProps } from "./list-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ListItemProps>>({
  isActive: false,
  size: "sm",
  shape: "default",
});

export default function ComboboxItem(props: ListItemProps) {
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
    <Box
      as={props.as}
      attributes={{
        ...props.attributes,
        "data-is-active": props.isActive,
        "data-is-selected": props.isSelected,
        "data-is-disabled": props.isDisabled,
        "data-shape": props.shape,
      }}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      {...props._css}
      className={clx(
        listItem({ intent: "none", size: props.size, theme: state.theme }),
        props.className,
      )}
      boxRef={props.itemRef}
    >
      {props.children}
    </Box>
  );
}
