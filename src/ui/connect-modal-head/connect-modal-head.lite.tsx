import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
  useDefaultProps,
} from "@builder.io/mitosis";
import clx from "clsx";
import Button from "../button";
import { store } from "../../models/store";
import * as styles from "./connect-modal-head.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalHeadProps } from "./connect-modal-head.types";

export default function ConnectModalHead(props: ConnectModalHeadProps) {
  useDefaultProps({
    hasBackButton: false,
    hasCloseButton: true,
  });

  const state = useStore<{ theme: ThemeVariant }>({
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
    <div className={clx(styles.modalHeader, props.className)}>
      <Show when={props.hasBackButton}>
        <div className={clx(styles.modalBackButton)}>
          <Button
            rightIcon="arrowLeftSLine"
            intent="secondary"
            variant="ghost"
            size="sm"
            iconSize="$2xl"
            attributes={{ px: "$0" }}
            onClick={(e) => {
              props.onBack?.(e);
            }}
          />
        </div>
      </Show>

      <p className={styles.modalHeaderText[state.theme]} {...props.titleProps}>
        {props.title}
      </p>

      <Show when={props.hasCloseButton}>
        <div className={clx(styles.modalCloseButton)}>
          <Button
            rightIcon="closeFilled"
            intent="secondary"
            variant="ghost"
            size="sm"
            iconSize="$2xl"
            attributes={{
              px: "$0",
            }}
            domAttributes={props.closeButtonProps}
            onClick={(e) => props.closeButtonProps?.onClick?.(e)}
          />
        </div>
      </Show>
    </div>
  );
}
