import {
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  onUpdate,
  useRef,
  Show,
} from "@builder.io/mitosis";
import clsx from "clsx";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import {
  modalContent,
  modalChildren,
  activeScaleUp,
  active,
} from "./connect-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const state = useStore<{
    theme: ThemeVariant;
    animateType: string;
    animateBack: () => void;
    animateNext: () => void;
  }>({
    theme: "light",
    animateType: "active",
    animateBack() {
      state.animateType = "";
      setTimeout(() => {
        state.animateType = "active";
      }, 0);
    },
    animateNext() {
      state.animateType = "";
      setTimeout(() => {
        state.animateType = "activeScaleUp";
      }, 0);
    },
  });

  let cleanupRef = useRef<() => void>(null);
  const heightRef = useRef<HTMLDivElement>();

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    if (!heightRef) return;
    setTimeout(() => {
      const height = window.getComputedStyle(heightRef).height;
      heightRef.style.height = "auto";
      const targetheight = window.getComputedStyle(heightRef).height;
      heightRef.style.height = height;
      setTimeout(() => {
        heightRef.style.height = targetheight;
      }, 100);
    }, 0);
  }, [props.children]);

  onUpdate(() => {
      setTimeout(() => {
        if (props.isOpen && heightRef) {
        heightRef.style.height = window.getComputedStyle(heightRef)?.height;
      }
      }, 300);
  }, [props.isOpen]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    // @ts-expect-error
    <ScaffoldModal
      ref={heightRef}
      isOpen={props.isOpen}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      animateBack={state.animateBack}
      animateNext={state.animateNext}
      header={props.header}
      className={props.modalContainerClassName}
      contentClassName={modalContent[state.theme]}
      childrenClassName={clsx(modalChildren, {
        [active]: state.animateType === "active",
        [activeScaleUp]: state.animateType === "activeScaleUp",
      })}
    >
      {props.children}
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
