import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  connectButtonStyle,
  buttonTextStyle,
  logoVariants,
  buttonTextVariants,
  subLogoSquare,
  subLogoList,
} from "./connect-modal-wallet-button.css";
import { store } from "../../models/store";
import Box from "../box";
import Icon from "../icon";
import { fullWidthHeight } from "../shared/shared.css";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({ isAttachedToShadowDom: true });

export default function ConnectModalWalletButton(
  props: ConnectModalWalletButtonProps
) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <button
      class={clx(
        connectButtonStyle[state.theme],
        connectButtonVariants({
          variant: props.variant,
        })
      )}
      onClick={(event: any) => props.onClick(event)}
    >
      <Show when={!!props.logo}>
        <Box
          as="span"
          position="relative"
          display="block"
          className={clx(
            logoVariants({
              variant: props.variant,
            })
          )}
        >
          <img alt={props.name} src={props.logo} className={fullWidthHeight} />

          <Show
            when={
              props.variant === "square" && typeof props.subLogo === "string"
            }
          >
            <span className={subLogoSquare[state.theme]}>
              <Show when={props.subLogo === "walletConnect"}>
                <Icon name={"mobileWalletCircle"} size={"2xl"} />
              </Show>

              <Show when={props.subLogo !== "walletConnect"}>
                <Box
                  as="img"
                  attributes={{
                    src: props.subLogo,
                    alt: `${props.name} sub logo`,
                  }}
                  width="$10"
                  height="$10"
                />
              </Show>
            </span>
          </Show>
        </Box>
      </Show>

      <span
        className={clx(
          buttonTextStyle[state.theme],
          buttonTextVariants({ variant: props.variant })
        )}
      >
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
            <Box
              as="img"
              attributes={{
                src: props.subLogo,
                alt: `${props.name} sub logo`,
              }}
              width="$9"
              height="$9"
            />
          </Show>
        </span>
      </Show>
    </button>
  );
}
