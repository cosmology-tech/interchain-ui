import {
  useStore,
  onMount,
  onUnMount,
  Show,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import copy from "copy-to-clipboard";
import Icon from "../icon";
import {
  containerStyle,
  textStyle,
  iconStyle,
  truncateEndStyle,
} from "./clipboard-copy-text.css";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";
import { clipboardCopyTextOverrides } from "./clipboard-copy-text.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import type { ClipboardCopyTextProps } from "./clipboard-copy-text.types";
import Text from "../text";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ClipboardCopyText(props: ClipboardCopyTextProps) {
  const state = useStore<{
    idle: boolean;
    internalTheme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
    transform: (text: string) => string;
    handleOnClick: (event?: any) => void;
    getTruncateClass: () => string;
  }>({
    idle: true,
    internalTheme: "light",
    overrideManager: null,
    transform: (text: string) => {
      if (props.truncate === "middle") {
        const truncateLength = {
          lg: 14,
          md: 16,
          sm: 18,
        };

        return truncateTextMiddle(
          text,
          truncateLength[props.midTruncateLimit ?? "md"],
        );
      }

      return text;
    },
    handleOnClick: (event?: any) => {
      const success = copy(props.text);

      if (success) {
        props.onCopied?.(event);
        state.idle = false;

        setTimeout(() => {
          state.idle = true;
        }, 1000);
      }
    },
    getTruncateClass: () => {
      return clx(textStyle, props.truncate === "end" && truncateEndStyle);
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.internalTheme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.internalTheme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <div
      className={clx(containerStyle[state.internalTheme], props.className)}
      onClick={(event) => state.handleOnClick(event)}
      style={state.overrideManager?.applyOverrides(
        clipboardCopyTextOverrides.name,
      )}
    >
      <Text color="$textSecondary" className={state.getTruncateClass()}>
        {state.transform(props.text)}
      </Text>

      <Show
        when={state.idle}
        else={
          <Icon
            name={"checkboxCircle"}
            size="$md"
            className={iconStyle.copied[state.internalTheme]}
          />
        }
      >
        <Icon name={"copy"} size="$md" className={iconStyle.idle} />
      </Show>
    </div>
  );
}
