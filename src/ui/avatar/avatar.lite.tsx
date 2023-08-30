import {
  useStore,
  useDefaultProps,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import clx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import Box from "../box";
import AvatarImage from "./avatar-image.lite";
import { store } from "../../models/store";
import { avatarSize } from "./avatar.helper";
import { avatarSizeVar, avatar } from "./avatar.css";
import { callAllHandlers } from "../../helpers";
import type { AvatarProps } from "./avatar.types";

export default function Avatar(props: AvatarProps) {
  useDefaultProps({
    size: "md",
  });

  const state = useStore({
    theme: "light",
    isLoaded: false,
    handleOnLoad(event) {
      callAllHandlers(props.onLoad, () => {
        state.isLoaded = true;
      })(event);
    },
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
      as="span"
      borderWidth={props.showBorder ? "$sm" : undefined}
      borderColor={props.borderColor}
      className={clx(avatar[state.theme], props.className)}
      style={assignInlineVars({
        [avatarSizeVar]: `${avatarSize(props.size)}`,
      })}
      attributes={{
        "data-loaded": state.isLoaded,
        ...props.attributes,
      }}
    >
      <AvatarImage
        src={props.src}
        srcSet={props.srcSet}
        loading={props.loading}
        onLoad={state.handleOnLoad}
        onError={props.onError}
        getInitials={props.getInitials}
        name={props.name}
        borderRadius={props.borderRadius}
        ignoreFallback={props.ignoreFallback}
        crossOrigin={props.crossOrigin}
        referrerPolicy={props.referrerPolicy}
      />
      {props.children}
    </Box>
  );
}
