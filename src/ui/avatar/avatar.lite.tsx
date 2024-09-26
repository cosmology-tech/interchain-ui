import {
  useStore,
  useDefaultProps,
  useMetadata,
  useRef,
  onMount,
  onUnMount,
  onUpdate,
} from "@builder.io/mitosis";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import Box from "../box";
import AvatarImage from "../avatar-image";
import { store } from "../../models/store";
import { avatarSize } from "./avatar.helper";
import { avatarSizeVar, avatar } from "./avatar.css";
import type { AvatarProps } from "./avatar.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AvatarProps>>({
  size: "md",
  rounded: true,
  fallbackMode: "initials",
});

export default function Avatar(props: AvatarProps) {
  const state = useStore({
    internalTheme: "light",
    isLoaded: false,
    sizeValue: avatarSize(props.size),
    get cssVars() {
      return assignInlineVars({
        [avatarSizeVar]: state.sizeValue,
      });
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onUpdate(() => {
    state.sizeValue = avatarSize(props.size);
  }, [props.size]);

  onMount(() => {
    state.internalTheme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.internalTheme = newState.theme;
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
      borderRadius={props.rounded ? "$full" : "none"}
      backgroundColor={props.backgroundColor}
      className={props.className}
      attributes={props.attributes}
    >
      <span
        className={avatar[state.internalTheme]}
        data-loaded={state.isLoaded}
        data-custom-bg={!!props.backgroundColor}
        style={state.cssVars}
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
          width={state.sizeValue}
          height={state.sizeValue}
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
