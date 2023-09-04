import {
  useDefaultProps,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import { avatarBadge, avatarBadgePlacement } from "./avatar.css";
import type { AvatarBadgeProps } from "./avatar.types";

export default function AvatarBadge(props: AvatarBadgeProps) {
  useDefaultProps({
    placement: "bottom-right",
    size: "1.25em",
  });

  const state = useStore({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      boxRef={props.ref}
      display="flex"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      borderRadius="$full"
      {...props.attributes}
      width={props.size}
      height={props.size}
      className={clx(
        avatarBadge[state.theme],
        avatarBadgePlacement[props.placement],
        props.className
      )}
    >
      {props.children}
    </Box>
  );
}
