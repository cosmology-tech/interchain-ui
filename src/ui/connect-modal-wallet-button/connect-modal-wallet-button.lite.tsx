import { Show, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  logoVariants,
  buttonTextVariants,
  subLogoSquare,
  subLogoList,
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
          <img
            alt={props.name}
            src={props.logo}
            className={s({ width: "full", height: "full" })}
          />

          <Show
            when={
              props.variant === "square" && typeof props.subLogo === "string"
            }
          >
            <span className={subLogoSquare}>
              <Show when={props.subLogo === "walletConnect"}>
                <Icon name={"mobileWalletCircle"} size={"2xl"} />
              </Show>

              <Show when={props.subLogo !== "walletConnect"}>
                <img
                  src={props.subLogo}
                  alt={`${props.name} sub logo`}
                  className={s({ width: "10", height: "10" })}
                />
              </Show>
            </span>
          </Show>
        </span>
      </Show>

      <span className={buttonTextVariants({ variant: props.variant })}>
        {props.name}
      </span>

      <Show
        when={props.variant === "list" && typeof props.subLogo === "string"}
      >
        <span className={subLogoList}>
          <Show when={props.subLogo === "walletConnect"}>
            <Icon name={"mobileWallet"} size={"xl"} />
          </Show>

          <Show when={props.subLogo !== "walletConnect"}>
            <img
              src={props.subLogo}
              alt={`${props.name} sub logo`}
              className={s({ width: "9", height: "9" })}
            />
          </Show>
        </span>
      </Show>
    </button>
  );
}
