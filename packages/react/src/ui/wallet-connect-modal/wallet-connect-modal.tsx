import * as React from "react";
import { forwardRef } from "react";
import Button from "../button";
import { WalletConnectModalProps } from "./wallet-connect-modal.types";
import Modal from "../modal";

const WalletConnectModal = forwardRef<WalletConnectModalProps["forwardedRef"]>(
  function WalletConnectModal(props: WalletConnectModalProps, forwardedRef) {
    return (
      <Modal ref={forwardedRef}>
        {props.children}

        <Button>hello</Button>
      </Modal>
    );
  }
);

export default WalletConnectModal;
