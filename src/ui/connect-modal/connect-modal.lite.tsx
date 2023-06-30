import { useMetadata } from "@builder.io/mitosis";
import type { ConnectModalProps } from "./connect-modal.types";
import { modalContent, modalChildren } from "./connect-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
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
      {props.children}
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
