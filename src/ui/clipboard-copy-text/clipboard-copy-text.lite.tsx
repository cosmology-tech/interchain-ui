import { useStore } from "@builder.io/mitosis";
import clx from "clsx";
import copy from "copy-to-clipboard";
import Icon from "../icon";
import {
  containerStyle,
  textStyle,
  iconStyle,
} from "./clipboard-copy-text.css";
import type { ClipboardCopyTextProps } from "./clipboard-copy-text.types";

export default function ClipboardCopyText(props: ClipboardCopyTextProps) {
  const state = useStore<{ idle: boolean }>({
    idle: true,
  });

  return (
    <div
      className={clx(containerStyle, props.className)}
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
      <p className={textStyle}>{props.text}</p>

      <Icon
        name={state.idle ? "copy" : "checkboxCircle"}
        size="md"
        className={state.idle ? iconStyle.idle : iconStyle.copied}
      />
    </div>
  );
}
