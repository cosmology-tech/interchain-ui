import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
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
      onClick={() => {
        const success = copy(props.text);

        if (success) {
          props.onCopied?.();
          state.idle = false;

          setTimeout(() => {
            state.idle = true;
          }, 1000);
        }
      }}
    >
      <p
        className={clx(textStyle, props.truncate === "end" && truncateEndStyle)}
      >
        {state.transform(props.text)}
      </p>

      <Icon
        name={state.idle ? "copy" : "checkboxCircle"}
        size="$md"
        className={state.idle ? iconStyle.idle : iconStyle.copied[state.theme]}
      />
    </div>
  );
}
