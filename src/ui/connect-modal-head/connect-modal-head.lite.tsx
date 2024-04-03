import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Button from "../button";
import Icon from "../icon";
import { store } from "../../models/store";
import * as styles from "./connect-modal-head.css";
import { connectModalHeadTitleOverrides } from "./connect-modal-head.helper";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ConnectModalHeadProps } from "./connect-modal-head.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalHead(props: ConnectModalHeadProps) {
  useDefaultProps({
    hasBackButton: false,
    hasCloseButton: true,
  });

  const state = useStore<{
    theme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
  }>({
    theme: "light",
    overrideManager: null,
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <div className={clx(styles.modalHeader, props.className)}>
      <Show when={props.hasBackButton}>
        <div className={styles.modalBackButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            onClick={(e) => {
              props.onBack?.(e);
            }}
          >
            <Icon name="arrowLeftSLine" size="$2xl" color="$text" />
          </Button>
        </div>
      </Show>

      <p
        id={props.id}
        className={styles.modalHeaderText[state.theme]}
        style={state.overrideManager?.applyOverrides(
          connectModalHeadTitleOverrides.name,
        )}
        {...props.titleProps}
      >
        {props.title}
      </p>

      <Show when={props.hasCloseButton}>
        <div className={styles.modalCloseButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            domAttributes={props.closeButtonProps}
            onClick={(e) => props.closeButtonProps?.onClick?.(e)}
          >
            <Icon name="closeFilled" size="$2xl" color="$text" />
          </Button>
        </div>
      </Show>
    </div>
  );
}
