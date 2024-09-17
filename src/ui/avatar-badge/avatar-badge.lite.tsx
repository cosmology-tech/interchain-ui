import {
  useDefaultProps,
  useStore,
  useRef,
  onMount,
  onUnMount,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import { avatarBadge, avatarBadgePlacement } from "../avatar/avatar.css";
import type { AvatarBadgeProps } from "../avatar/avatar.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function AvatarBadge(props: AvatarBadgeProps) {
  useDefaultProps({
    placement: "bottom-right",
    size: "1.25em",
    borderWidth: "0.2em",
  });

  const state = useStore({
    internalTheme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.internalTheme = store.getState().theme;
    cleanupRef = store.subscribe((newState, prevState) => {
      state.internalTheme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      boxRef={props.boxRef}
      display="flex"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      borderRadius="$full"
      borderWidth={props.borderWidth}
      {...props.attributes}
      width={props.size}
      height={props.size}
      className={clx(
        avatarBadge[state.internalTheme],
        avatarBadgePlacement[props.placement],
        props.className,
      )}
    >
      {props.children}
    </Box>
  );
}
