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
import Avatar from "../avatar";
import AvatarBadge from "../avatar/avatar-badge.lite";
import Icon from "../icon";
import { fullWidthHeight } from "../shared/shared.css";
import {
  buttonOverrides,
  buttonLabelOverrides,
  buttonSublogoOverrides,
} from "./connect-modal-wallet-button.helper";
import Text from "../text";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import { WalletPluginSystem } from "../connect-modal-wallet-list";

useMetadata({ isAttachedToShadowDom: true });

export default function ConnectModalWalletButton(
  props: ConnectModalWalletButtonProps
) {
  const state = useStore<{
    theme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
  }>({
    theme: "light",
    overrideManager: null,
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
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
      style={state.overrideManager?.applyOverrides(buttonOverrides.name)}
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
          <Box position="relative">
            {/* When there is only logo, use normal image */}
            <Show when={props.logo && !props.btmLogo}>
              <img
                alt={props.name}
                src={props.logo}
                className={fullWidthHeight}
              />
            </Show>

            {/* When there are logo and btmLogo, use Avatar */}
            <Show when={props.btmLogo}>
              <Avatar
                name={props.name}
                src={props.logo}
                backgroundColor="transparent"
                rounded={false}
                size="sm"
              >
                <AvatarBadge
                  size="1.2em"
                  borderWidth="0.1em"
                  attributes={{
                    backgroundColor:
                      state.theme === "dark" ? "$gray300" : "$white",
                  }}
                >
                  <Box
                    as="img"
                    width="100%"
                    height="100%"
                    borderRadius="$full"
                    attributes={{
                      alt: ["MetaMask"].includes(props.btmLogo)
                        ? props.btmLogo
                        : `${props.name} logo`,
                      src: ["MetaMask"].includes(props.btmLogo)
                        ? WalletPluginSystem[props.btmLogo].logo
                        : props.btmLogo,
                    }}
                  />
                </AvatarBadge>
              </Avatar>
            </Show>

            {/* <Box
                p="2px"
                size="1.2rem"
                right="0"
                bottom="5px"
                position="absolute"
                transform="translate(25%, 25%)"
                attributes={{
                  borderRadius: "$full",
                  backgroundColor:
                    state.theme === "dark" ? "$gray300" : "$white",
                }}
              >
                <Box
                  as="img"
                  attributes={{
                    alt: ["MetaMask"].includes(props.btmLogo)
                      ? props.btmLogo
                      : `${props.name} logo`,
                    src: ["MetaMask"].includes(props.btmLogo)
                      ? WalletPluginSystem[props.btmLogo].logo
                      : props.btmLogo,
                  }}
                  borderRadius="$full"
                  height="100%"
                  width="100%"
                />
              </Box> */}
          </Box>

          <Show
            when={
              props.variant === "square" && typeof props.subLogo === "string"
            }
          >
            <span
              className={subLogoSquare[state.theme]}
              style={state.overrideManager?.applyOverrides(
                buttonSublogoOverrides.name
              )}
            >
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

      <Box
        className={clx(
          buttonTextStyle[state.theme],
          buttonTextVariants({ variant: props.variant })
        )}
        style={state.overrideManager?.applyOverrides(buttonLabelOverrides.name)}
      >
        <Text
          as="span"
          attributes={{
            display: "inline-block",
            position: "relative",
            pr: "$2",
          }}
        >
          <Text>{props.name}</Text>
          <Show when={props.badge}>
            <Text
              as="span"
              fontSize="$3xs"
              fontWeight="$semibold"
              attributes={{
                px: "$3",
                py: "4px",
                borderRadius: "$md",
                textTransform: "uppercase",
                position: "absolute",
                top: "$-3",
                left: "$full",
                color: state.theme === "dark" ? "$gray300" : "$gray800",
                backgroundColor:
                  state.theme === "dark" ? "$gray600" : "$gray200",
              }}
            >
              {props.badge}
            </Text>
          </Show>
        </Text>
      </Box>

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
