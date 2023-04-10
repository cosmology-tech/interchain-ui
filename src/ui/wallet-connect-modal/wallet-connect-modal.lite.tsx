import { useMetadata } from "@builder.io/mitosis";
import Button from "../button";
import type { WalletConnectModalProps } from "./wallet-connect-modal.types";

useMetadata({
  scaffolds: ["modal"],
});

export default function WalletConnectModal(props: WalletConnectModalProps) {
  return (
    <ScaffoldModal ref={props.forwardedRef}>
      {props.children}
      <Button>hello</Button>
    </ScaffoldModal>
  );
}
