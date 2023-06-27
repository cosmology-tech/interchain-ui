import { useMetadata, onUpdate, useRef } from "@builder.io/mitosis";
import autoAnimate from "@formkit/auto-animate";
import type { ConnectModalProps } from "./connect-modal.types";
import { modalContent, modalChildren } from "./connect-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const parentRef = useRef<HTMLDivElement>();

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
      contentClassName={modalContent}
      childrenClassName={modalChildren}
    >
      <div ref={parentRef}>{props.children}</div>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
