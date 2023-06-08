import { Show, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  logoVariants,
  buttonTextVariants,
  mobileIconStyleSquare,
  mobileIconStyleList,
} from "./connect-modal-wallet-button.css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Icon from "../icon";

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
          className={clx(
            logoVariants({
              variant: props.variant,
            }),
            s({ position: "relative", display: "block" })
          )}
        >
          <img alt={props.name} src={props.logo} />

          <Show when={props.isMobile && props.variant === "square"}>
            <span className={mobileIconStyleSquare}>
              <Icon name={"mobileWalletCircle"} size={"2xl"} />
            </span>
          </Show>
        </span>
      </Show>

      <span className={buttonTextVariants({ variant: props.variant })}>
        {props.name}
      </span>

      <Show when={props.isMobile && props.variant === "list"}>
        <span className={mobileIconStyleList}>
          <Icon name={"mobileWallet"} size={"xl"} />
        </span>
      </Show>
    </button>
  );
}
