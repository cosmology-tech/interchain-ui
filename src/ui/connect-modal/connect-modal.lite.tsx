import { Show, useMetadata, useStore } from "@builder.io/mitosis";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Button from "../button";
import WalletList from "../connect-modal-wallet-list";
import WalletStatus from "../connect-modal-status";
import ConnectModalQRCode from "../connect-modal-qrcode";
import type {
  ConnectModalProps,
  ConnectModalStep,
} from "./connect-modal.types";
import type { Wallet } from "../connect-modal-wallet-list/connect-modal-wallet-list.types";
import {
  headerText,
  modalContent,
  modalHeader,
  modalCloseButton,
} from "./connect-modal.css";
import { connectModalStepByValue } from "./connect-modal.types";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const state = useStore<{
    step: number;
    currentWallet: Wallet | null;
  }>({
    step: connectModalStepByValue["init"],
    currentWallet: null,
  });

  return (
    // @ts-expect-error
    <ScaffoldModal
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      trigger={
        props.trigger ?? (
          <Button leftIcon="walletFilled">Connect a wallet</Button>
        )
      }
      closeButton={
        <Button
          rightIcon="closeFilled"
          intent="secondary"
          variant="ghost"
          size="sm"
          iconSize="xl"
          className={s({ p: "0" })}
        />
      }
      title={
        <p className={headerText}>
          {state.step === connectModalStepByValue["init"]
            ? "Select your wallet"
            : state.currentWallet?.name ?? state.currentWallet?.prettyName}
        </p>
      }
      className={props.modalContainerClassName}
      contentClassName={modalContent}
      headerClassName={modalHeader}
      closeButtonClassName={modalCloseButton}
    >
      <Show when={state.step === connectModalStepByValue["init"]}>
        <WalletList
          wallets={props.wallets}
          onWalletItemClick={(wallet: Wallet) => {
            state.currentWallet = wallet;
            if (wallet.isMobile) {
              state.step = connectModalStepByValue["connectingMobile"];
            } else {
              state.step = connectModalStepByValue["connecting"];
            }
          }}
        />
      </Show>

      <Show when={state.step === connectModalStepByValue["connecting"]}>
        <WalletStatus
          wallet={state.currentWallet}
          status={props.status}
          bottomLink={props.statusBottomLink}
          onConnect={() => props.onConnect?.()}
          onDisconnect={() => props.onDisconnect?.()}
          onChangeWallet={() => props.onChangeWallet?.()}
          connectedInfo={props.statusConnectedInfo}
          errorInfo={props.statusErrorInfo}
        />
      </Show>

      {props.children}
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
