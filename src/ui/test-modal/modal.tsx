import { useStore, useRef, Show } from "@builder.io/mitosis";
import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps } from "@zag-js/react";
import { modalContainer, modalBackdrop, modalContent } from "./modal.css";
import type { ModalProps } from "./modal.types";

export default function Modal(props: ModalProps) {
  const machine = useMachine(
    dialog.machine({ id: props.id, defaultOpen: props.defaultOpen })
  );
  let machineRef: any = useRef(null);
  let apiRef: any = useRef(null);

  const state = useStore({
    get api() {
      if (!apiRef) {
        const [mState, send] = machine;
        apiRef = dialog.connect(mState, send, normalizeProps);
      }
      return apiRef;
    },
  });

  return (
    <>
      {props.renderTrigger(state.api.triggerProps)}
      <Show when={state.api.isOpen}>
        <div {...state.api.backdropProps} class={modalBackdrop} />
        <div {...state.api.containerProps} class={modalContainer}>
          <div {...state.api.contentProps} class={modalContent}>
            <h2 {...state.api.titleProps}>Edit profile</h2>
            {props.renderContent({ isOpen: state.api.isOpen })}
            <button {...state.api.closeTriggerProps}>Close</button>
          </div>
        </div>
      </Show>
    </>
  );
}
