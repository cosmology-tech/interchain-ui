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
import { connectModalHeadTitleOverrides } from "./connect-modal-head.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./connect-modal-head.css";
import type { ThemeVariant } from "../../models/system.model";
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
    internalTheme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
    modalHeadTitleClassName: string;
  }>({
    internalTheme: "light",
    overrideManager: null,
    get modalHeadTitleClassName() {
      return styles.modalHeaderText[state.internalTheme];
    },
  });

  let cleanupRef = useRef<() => void>(null);

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
    <div className={clx(styles.modalHeader, props.className)}>
      <Show when={props.hasBackButton}>
        <div className={styles.modalBackButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            className={styles.headerButton}
            onClick={(e) => {
              props.onBack?.(e);
            }}
          >
            <Icon name="arrowLeftSLine" size="$2xl" color="inherit" />
          </Button>
        </div>
      </Show>

      <p
        {...props.titleProps}
        id={props.id}
        className={clx(
          state.modalHeadTitleClassName,
          props.titleProps?.className,
        )}
        style={state.overrideManager?.applyOverrides(
          connectModalHeadTitleOverrides.name,
        )}
      >
        {props.title}
      </p>

      <Show when={props.hasCloseButton}>
        <div className={styles.modalCloseButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            className={styles.headerButton}
            domAttributes={props.closeButtonProps}
            onClick={(e) => props.closeButtonProps?.onClick?.(e)}
          >
            <Icon name="closeFilled" size="$2xl" color="inherit" />
          </Button>
        </div>
      </Show>
    </div>
  );
}
