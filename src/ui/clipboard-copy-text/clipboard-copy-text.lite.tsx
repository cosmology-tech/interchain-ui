import {
  useStore,
  onMount,
  onUnMount,
  Show,
  useRef,
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
import type { ThemeVariant } from "../../models/system.model";
import { truncateTextMiddle } from "../../helpers/string";
import type { ClipboardCopyTextProps } from "./clipboard-copy-text.types";

export default function ClipboardCopyText(props: ClipboardCopyTextProps) {
  const state = useStore<{
    idle: boolean;
    theme: ThemeVariant;
    transform: (text: string) => string;
    handleOnClick: () => void;
    getTruncateClass: () => string;
  }>({
    idle: true,
    theme: "light",
    transform: (text: string) => {
      if (props.truncate === "middle") {
        const truncateLength = {
          lg: 14,
          md: 16,
          sm: 18,
        };

        return truncateTextMiddle(
          text,
          truncateLength[props.midTruncateLimit ?? "md"]
        );
      }

      return text;
    },
    handleOnClick: () => {
      const success = copy(props.text);

      if (success) {
        props.onCopied?.();
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
      className={clx(containerStyle[state.theme], props.className)}
      onClick={() => state.handleOnClick()}
    >
      <p className={state.getTruncateClass()}>{state.transform(props.text)}</p>

      <Show
        when={state.idle}
        else={
          <Icon
            name={"checkboxCircle"}
            size="$md"
            className={iconStyle.copied[state.theme]}
          />
        }
      >
        <Icon name={"copy"} size="$md" className={iconStyle.idle} />
      </Show>
    </div>
  );
}
