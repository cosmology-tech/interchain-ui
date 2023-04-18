import { useMetadata } from "@builder.io/mitosis";
import Button from "../button";
import type { WalletConnectModalProps } from "./wallet-connect-modal.types";

useMetadata({
  scaffolds: ["modal"],
});

export default function WalletConnectModal(props: WalletConnectModalProps) {
  return (
    <ScaffoldModal trigger={<Button>hello</Button>}>
      {props.children}
    </ScaffoldModal>
  );
}
