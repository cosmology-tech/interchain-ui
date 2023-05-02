import { onMount, Show, useStore } from "@builder.io/mitosis";
// import { buttonStyles } from "./wallet-connect-modal.css";
import type { WalletConnectModalProps } from "./wallet-connect-modal.types";

export default function WalletConnectModal(props: WalletConnectModalProps) {
  return (
    <ScaffoldModal>
      <div ref={props.forwardedRef}>{props.children}</div>
    </ScaffoldModal>
  );
}
