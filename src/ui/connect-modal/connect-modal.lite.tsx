import {
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import AnimateLayout from "../animate-layout";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import {
  modalContent,
  modalChildren,
  modalAnimateContainer,
} from "./connect-modal.css";
import { connectModalOverrides } from "./connect-modal.helper";
import type { OverrideStyleManager } from "../../styles/override/override";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["modal"],
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModal(props: ConnectModalProps) {
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
    // @ts-expect-error
    <ScaffoldModal
      isOpen={props.isOpen}
      closeOnClickaway={true}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      header={props.header}
      className={props.modalContainerClassName}
      contentClassName={clx(
        modalContent[state.theme],
        props.modalContentClassName
      )}
      contentStyles={{
        ...state.overrideManager?.applyOverrides(connectModalOverrides.name),
        ...props.modalContentStyles,
      }}
      childrenClassName={clx(modalChildren, props.modalChildrenClassName)}
    >
      <AnimateLayout className={modalAnimateContainer}>
        {props.children}
      </AnimateLayout>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
