import { Show, useMetadata, useStore } from "@builder.io/mitosis";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Button from "../button";
import WalletList from "../connect-modal-wallet-list";
import WalletStatus from "../connect-modal-status";
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

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const state = useStore<{
    step: ConnectModalStep;
    currentWallet: Wallet | null;
  }>({
    step: "init",
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
          className={s({ px: "2", py: "2" })}
        />
      }
      title={
        props.title ?? (
          <p className={headerText}>
            {state.step === "init"
              ? "Select a wallet"
              : state.currentWallet?.name}
          </p>
        )
      }
      className={props.modalContainerClassName}
      contentClassName={modalContent}
      headerClassName={modalHeader}
      closeButtonClassName={modalCloseButton}
    >
      <Show when={state.step === "init"}>
        <WalletList
          wallets={props.wallets}
          onWalletItemClick={(wallet: Wallet) => {
            console.log("clicked on", wallet);
            state.step = "connecting";
            state.currentWallet = wallet;
          }}
        />
      </Show>

      <Show when={state.step === "connecting"}>
        <WalletStatus
          wallet={state.currentWallet}
          status={props.status}
          bottomLink={props.statusBottomLink}
          connectedInfo={{
            name: "David Dave Ruppert",
            avatarUrl:
              "https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg",
            address: "cosmos1veawurwraxw4kq30ygdpjn85jjxv67x3remaxu",
          }}
          errorInfo={{
            message:
              "Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui.",
          }}
        />
      </Show>

      {props.children}
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
