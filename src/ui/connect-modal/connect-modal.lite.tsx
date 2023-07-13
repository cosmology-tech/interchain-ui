import {
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  onUpdate,
  useRef,
} from "@builder.io/mitosis";
import autoAnimate from "@formkit/auto-animate";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import { modalContent, modalChildren } from "./connect-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);
  const parentRef = useRef<HTMLDivElement>();

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    if (parentRef) {
      autoAnimate(parentRef);
    }
  }, [parentRef]);

  return (
    // @ts-expect-error
    <ScaffoldModal
      isOpen={props.isOpen}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      header={props.header}
      className={props.modalContainerClassName}
      contentClassName={modalContent[state.theme]}
      childrenClassName={modalChildren}
    >
      <div className={s({ minHeight: "30" })} ref={parentRef}>
        {props.children}
      </div>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
