import { Show, useMetadata } from "@builder.io/mitosis";
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  logoVariants,
  buttonTextVariants,
} from "./connect-modal-wallet-button.css";

useMetadata({ isAttachedToShadowDom: true });

export default function ConnectModalWalletButton(
  props: ConnectModalWalletButtonProps
) {
  return (
    <button
      class={connectButtonVariants({
        variant: props.variant,
      })}
      onClick={(event: any) => props.onClick(event)}
    >
      <Show when={!!props.logo}>
        <span
          className={logoVariants({
            variant: props.variant,
          })}
        >
          <img alt={props.name} src={props.logo} />
        </span>
      </Show>

      <span className={buttonTextVariants({ variant: props.variant })}>
        {props.name}
      </span>
    </button>
  );
}
