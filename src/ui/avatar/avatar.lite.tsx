import {
  useStore,
  useDefaultProps,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import Box from "../box";
import AvatarImage from "./avatar-image.lite";
import { store } from "../../models/store";
import { avatarSize } from "./avatar.helper";
import { avatarSizeVar, avatar } from "./avatar.css";
import type { AvatarProps } from "./avatar.types";

useDefaultProps<Partial<AvatarProps>>({
  size: "md",
  rounded: true,
  fallbackMode: "initials",
});

export default function Avatar(props: AvatarProps) {
  const state = useStore({
    theme: "light",
    isLoaded: false,
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
      display="inline-flex"
      borderWidth={props.showBorder ? "$sm" : undefined}
      borderColor={props.borderColor}
      borderRadius={props.rounded ? "$full" : "$none"}
      backgroundColor={props.backgroundColor}
      className={props.className}
      attributes={props.attributes}
    >
      <span
        className={avatar[state.theme]}
        data-loaded={state.isLoaded}
        data-custom-bg={!!props.backgroundColor}
        style={assignInlineVars({
          [avatarSizeVar]: `${avatarSize(props.size)}`,
        })}
      >
        <AvatarImage
          src={props.src}
          srcSet={props.srcSet}
          loading={props.loading}
          fallbackMode={props.fallbackMode}
          onLoad={(event) => {
            props.onLoad?.(event);
            state.isLoaded = true;
          }}
          width={avatarSize(props.size) as string}
          height={avatarSize(props.size) as string}
          onError={props.onError}
          getInitials={props.getInitials}
          name={props.name}
          borderRadius={props.borderRadius}
          ignoreFallback={props.ignoreFallback}
          crossOrigin={props.crossOrigin}
          referrerPolicy={props.referrerPolicy}
        />
        {props.children}
      </span>
    </Box>
  );
}
