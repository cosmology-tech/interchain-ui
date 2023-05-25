import { For } from "@builder.io/mitosis";
import clx from "clsx";
import WalletButton from "../connect-modal-wallet-button";
import {
  walletList,
  squareWallets,
  listWallets,
  bottomShadow,
  container,
} from "./connect-modal-wallet-list.css";
import type { ConnectModalWalletListProps } from "./connect-modal-wallet-list.types";

export default function ConnectModalWalletList(
  props: ConnectModalWalletListProps
) {
  return (
    <div className={clx(container, props.className)}>
      <div className={walletList}>
        <div className={squareWallets}>
          {/* First 2 wallets are square */}
          <For each={props.wallets.slice(0, 2)}>
            {(wallet, index) => (
              <WalletButton
                key={wallet.name}
                variant="square"
                name={wallet.name}
                logo={wallet.logo}
                onClick={() => props.onWalletItemClick?.(wallet)}
              />
            )}
          </For>
        </div>
        <div className={listWallets}>
          <For each={props.wallets.slice(2)}>
            {(wallet, index) => (
              <WalletButton
                key={wallet.name}
                variant="list"
                name={wallet.name}
                logo={wallet.logo}
                onClick={() => props.onWalletItemClick?.(wallet)}
              />
            )}
          </For>
        </div>
      </div>

      <div className={bottomShadow} />
    </div>
  );
}
