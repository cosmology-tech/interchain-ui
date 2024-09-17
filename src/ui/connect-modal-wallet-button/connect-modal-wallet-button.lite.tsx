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
import AvatarBadge from "../avatar-badge";
import Icon from "../icon";
import {
  buttonOverrides,
  buttonLabelOverrides,
  buttonSublogoOverrides,
} from "./connect-modal-wallet-button.helper";
import Text from "../text";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import { WalletPluginSystem } from "../connect-modal-wallet-list";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalWalletButton(
  props: ConnectModalWalletButtonProps,
) {
  const state = useStore<{
    internalTheme: ThemeVariant;
    overrideManager: OverrideStyleManager | null;
  }>({
    internalTheme: "light",
    overrideManager: null,
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.internalTheme = store.getState().theme;
    state.overrideManager = store.getState().overrideStyleManager;

    cleanupRef = store.subscribe((newState) => {
      state.internalTheme = newState.theme;
      state.overrideManager = newState.overrideStyleManager;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <button
      class={clx(
        connectButtonStyle[state.internalTheme],
        connectButtonVariants({
          variant: props.variant,
        }),
      )}
      style={state.overrideManager?.applyOverrides(buttonOverrides.name)}
      title={props.name}
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
            }),
          )}
        >
          <Box position="relative">
            {/* When there is only logo, use normal image */}
            <Show when={props.logo && !props.btmLogo}>
              <img
                alt={props.name}
                src={props.logo}
                referrerPolicy="no-referrer"
                width={props.variant === "square" ? "56px" : "32px"}
                height={props.variant === "square" ? "56px" : "32px"}
                style={{ objectFit: "contain" }}
              />
            </Show>

            {/* When there are logo and btmLogo, use Avatar */}
            {/* List variant */}
            <Show when={props.btmLogo && props.variant === "list"}>
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
                      state.internalTheme === "dark" ? "$gray300" : "$white",
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "9999px", objectFit: "contain" }}
                    alt={
                      ["MetaMask"].includes(props.btmLogo)
                        ? props.btmLogo
                        : `${props.name} logo`
                    }
                    src={
                      ["MetaMask"].includes(props.btmLogo)
                        ? WalletPluginSystem[props.btmLogo].logo
                        : props.btmLogo
                    }
                  />
                </AvatarBadge>
              </Avatar>
            </Show>

            {/* Square variant */}
            <Show
              when={
                props.btmLogo && !props.subLogo && props.variant === "square"
              }
            >
              <Avatar
                name={props.name}
                src={props.logo}
                backgroundColor="transparent"
                rounded={false}
                size="md"
              >
                <AvatarBadge
                  size="1.2em"
                  borderWidth="0.1em"
                  attributes={{
                    backgroundColor:
                      state.internalTheme === "dark" ? "$gray300" : "$white",
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "9999px", objectFit: "contain" }}
                    alt={
                      ["MetaMask"].includes(props.btmLogo)
                        ? props.btmLogo
                        : `${props.name} logo`
                    }
                    src={
                      ["MetaMask"].includes(props.btmLogo)
                        ? WalletPluginSystem[props.btmLogo].logo
                        : props.btmLogo
                    }
                  />
                </AvatarBadge>
              </Avatar>
            </Show>
          </Box>

          {/* If it's metamask snap, it can't be wallet connect based on props.btmLogo */}
          <Show
            when={
              props.variant === "square" &&
              typeof props.subLogo === "string" &&
              !props.btmLogo
            }
          >
            <span
              className={subLogoSquare[state.internalTheme]}
              style={state.overrideManager?.applyOverrides(
                buttonSublogoOverrides.name,
              )}
            >
              <Show when={props.subLogo === "walletConnect"}>
                <Icon name={"mobileWalletCircle"} size={"2xl"} />
              </Show>

              <Show when={props.subLogo !== "walletConnect"}>
                <img
                  src={props.subLogo}
                  alt={`${props.name} sub logo`}
                  width="24px"
                  height="24px"
                  style={{ objectFit: "contain" }}
                />
              </Show>
            </span>
          </Show>
        </Box>
      </Show>

      <Box
        className={clx(
          buttonTextStyle[state.internalTheme],
          buttonTextVariants({ variant: props.variant }),
        )}
        rawCSS={{
          ...state.overrideManager?.applyOverrides(buttonLabelOverrides.name),
          width: props.variant === "square" ? "calc(80%)" : "auto",
        }}
      >
        <Show when={!props.badge}>
          <Text
            ellipsis
            as="span"
            textAlign={props.variant === "square" ? "center" : "left"}
            attributes={{
              width: "100%",
              display: "inline-block",
            }}
          >
            {props.name}
          </Text>
        </Show>

        <Show when={props.badge}>
          <Text
            as="p"
            attributes={{
              display: "inline-block",
              position: "relative",
              pr: "$2",
            }}
          >
            <Text
              ellipsis
              as="span"
              textAlign={props.variant === "square" ? "center" : "left"}
              attributes={{
                width: "100%",
                display: "inline-block",
              }}
            >
              {props.name}
            </Text>
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
                color: state.internalTheme === "dark" ? "$gray300" : "$gray800",
                backgroundColor:
                  state.internalTheme === "dark" ? "$gray600" : "$gray200",
              }}
            >
              {props.badge}
            </Text>
          </Text>
        </Show>
      </Box>

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
              width="20px"
              height="20px"
              style={{ objectFit: "contain" }}
            />
          </Show>
        </span>
      </Show>
    </button>
  );
}
