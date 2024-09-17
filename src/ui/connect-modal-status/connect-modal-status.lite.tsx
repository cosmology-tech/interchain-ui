import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Button from "../button";
import ClipboardCopyText from "../clipboard-copy-text";
import InstallButton from "../connect-modal-install-button";
import {
  statusLogo,
  disconnectedLogoFrame,
  disconnectedDesc,
  statusLogoImage,
  modalStatusContainer,
  connectingLogoFrame,
  connectingHeader,
  notExistLogoFrame,
  dangerText,
  errorDescription,
  statusLogoImageSvg,
  widthContainer,
  connectedInfo,
  desc,
  descMaxWidth,
  flexImg,
  bottomLink,
  copyText,
} from "./connect-modal-status.css";
import { baseTextStyles } from "../text/text.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalStatus(props: ConnectModalStatusProps) {
  const state = useStore({
    internalTheme: "light",
    getConnectedInfo: () => {
      return props.connectedInfo;
    },
    getWallet: () => {
      return props.wallet;
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.internalTheme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.internalTheme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <div
      className={clx(
        modalStatusContainer[state.internalTheme],
        props.className,
      )}
    >
      {/* Status disconnected */}
      <Show when={props.status === "Disconnected"}>
        <Box marginBottom="$5" className={statusLogo}>
          <div className={disconnectedLogoFrame[state.internalTheme]} />
          <div className={statusLogoImage}>
            <img
              src={state.getWallet().logo}
              alt={state.getWallet().name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={disconnectedDesc[state.internalTheme]}>
          Wallet is disconnected
        </p>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            fluidWidth
            onClick={() => props.onConnect?.()}
            attributes={{
              marginBottom: "$3",
            }}
          >
            Connect wallet
          </Button>
        </div>

        <Show when={!!props.bottomLink}>
          <div>
            <a
              href={props.bottomLink}
              target="_blank"
              rel="noreferrer"
              className={bottomLink}
            >
              Don't have a wallet?
            </a>
          </div>
        </Show>
      </Show>
      {/* Status connecting */}
      <Show when={props.status === "Connecting"}>
        <Box marginBottom="$8" className={statusLogo}>
          <div className={connectingLogoFrame[state.internalTheme]} />
          <div className={statusLogoImage}>
            <img
              src={state.getWallet().logo}
              alt={state.getWallet().name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={connectingHeader[state.internalTheme]}>
          {props.contentHeader}
        </p>

        <Box
          as="p"
          fontSize="$sm"
          color="$body"
          fontWeight="$normal"
          textAlign="center"
          className={descMaxWidth}
        >
          {props.contentDesc}
        </Box>
      </Show>

      {/* Status connected */}
      <Show when={props.status === "Connected"}>
        <Box marginBottom="$8" className={statusLogo}>
          <Show when={typeof state.getConnectedInfo().avatar === "string"}>
            <div className={statusLogoImage}>
              <img
                src={state.getConnectedInfo().avatar}
                alt={state.getConnectedInfo().name}
                className={flexImg}
              />
            </div>
          </Show>

          <Show
            when={
              !!state.getConnectedInfo().avatar &&
              typeof state.getConnectedInfo().avatar !== "string"
            }
          >
            <div className={statusLogoImageSvg}>
              {state.getConnectedInfo().avatar}
            </div>
          </Show>
        </Box>
        <Box display="flex" alignItems="center" marginBottom="$5">
          <img
            src={state.getWallet().logo}
            alt={state.getWallet().name}
            width="16px"
            height="16px"
          />

          <Show when={!!state.getConnectedInfo().name}>
            <p className={connectedInfo[state.internalTheme]}>
              {state.getConnectedInfo().name}
            </p>
          </Show>
        </Box>

        <div className={widthContainer}>
          <Box maxWidth="$29" mx="auto">
            <ClipboardCopyText
              text={state.getConnectedInfo().address}
              truncate="middle"
              className={copyText}
            />
          </Box>
        </div>

        <div className={widthContainer}>
          <Box
            maxWidth="$29"
            mx="auto"
            attributes={{
              "data-part-id": "ConnectModalStatus-disconnect",
            }}
          >
            <Button
              fluidWidth
              intent="primary"
              variant="solid"
              leftIcon="walletFilled"
              onClick={() => props.onDisconnect?.()}
            >
              Disconnect
            </Button>
          </Box>
        </div>
      </Show>

      {/* Status notExist */}
      <Show when={props.status === "NotExist"}>
        <Box marginBottom="$7" className={statusLogo}>
          <div className={notExistLogoFrame[state.internalTheme]} />
          <div className={statusLogoImage}>
            <img
              src={state.getWallet().logo}
              alt={state.getWallet().name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.internalTheme]}>{props.contentHeader}</p>

        <p className={clx(baseTextStyles, desc[state.internalTheme])}>
          {props.contentDesc}
        </p>

        <div className={widthContainer}>
          <Box mt="$7">
            <InstallButton
              fluidWidth
              onClick={() => props.onInstall?.()}
              disabled={!!props.disableInstall}
            >
              <Box
                as="span"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <span>{props.installIcon}</span>
                <Box as="span" marginLeft="$4">
                  Install{" "}
                  {state.getWallet().prettyName ?? state.getWallet().name}
                </Box>
              </Box>
            </InstallButton>
          </Box>
        </div>
      </Show>

      {/* Status rejected */}
      <Show when={props.status === "Rejected"}>
        <Box marginBottom="$7" className={statusLogo}>
          <div className={notExistLogoFrame[state.internalTheme]} />
          <div className={statusLogoImage}>
            <img
              src={state.getWallet().logo}
              alt={state.getWallet().name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.internalTheme]}>{props.contentHeader}</p>

        <p className={desc[state.internalTheme]}>{props.contentDesc}</p>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            fluidWidth
            onClick={() => props.onConnect?.()}
            attributes={{
              marginBottom: "$3",
            }}
          >
            Reconnect
          </Button>
        </div>
      </Show>

      {/* Status error */}
      <Show when={props.status === "Error"}>
        <Box marginBottom="$7" className={statusLogo}>
          <div className={notExistLogoFrame[state.internalTheme]} />
          <div className={statusLogoImage}>
            <img
              src={state.getWallet().logo}
              alt={state.getWallet().name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.internalTheme]}>{props.contentHeader}</p>

        <Box position="relative">
          <div className={errorDescription}>
            <p className={desc[state.internalTheme]}>{props.contentDesc}</p>
          </div>
          <div className={bottomShadow[state.internalTheme]} />
        </Box>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            fluidWidth
            onClick={() => props.onChangeWallet?.()}
            attributes={{
              marginBottom: "$3",
            }}
          >
            Change wallet
          </Button>
        </div>
      </Show>
    </div>
  );
}
