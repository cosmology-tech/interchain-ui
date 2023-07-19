import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Button from "../button";
import ClipboardCopyText from "../clipboard-copy-text";
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
  flexImg,
  bottomLink,
  copyText,
} from "./connect-modal-status.css";
import { baseTextStyles } from "../text/text.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

export default function ConnectModalStatus(props: ConnectModalStatusProps) {
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
    <div className={clx(modalStatusContainer[state.theme], props.className)}>
      {/* Status disconnected */}
      <Show when={props.status === "Disconnected"}>
        <Box marginBottom="$5" className={statusLogo}>
          <div className={disconnectedLogoFrame[state.theme]} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={disconnectedDesc[state.theme]}>Wallet is disconnected</p>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onConnect?.()}
            attributes={{
              width: "$full",
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
          <div className={connectingLogoFrame[state.theme]} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={connectingHeader[state.theme]}>{props.contentHeader}</p>

        <Box
          as="p"
          fontSize="$sm"
          color="$body"
          fontWeight="$normal"
          textAlign="center"
        >
          {props.contentDesc}
        </Box>
      </Show>

      {/* Status connected */}
      <Show when={props.status === "Connected"}>
        <Box marginBottom="$8" className={statusLogo}>
          <Show when={typeof props.connectedInfo.avatar === "string"}>
            <div className={statusLogoImage}>
              <img
                src={props.connectedInfo.avatar}
                alt={props.connectedInfo.name}
                className={flexImg}
              />
            </div>
          </Show>

          <Show
            when={
              !!props.connectedInfo.avatar &&
              typeof props.connectedInfo.avatar !== "string"
            }
          >
            <div className={statusLogoImageSvg}>
              {props.connectedInfo.avatar}
            </div>
          </Show>
        </Box>
        <Box display="flex" alignItems="center" marginBottom="$5">
          <Box
            as="img"
            attributes={{
              src: props.wallet.logo,
              alt: props.wallet.name,
            }}
            width="$8"
            height="$8"
          />

          <Show when={!!props.connectedInfo?.name}>
            <p className={connectedInfo[state.theme]}>
              {props.connectedInfo.name}
            </p>
          </Show>
        </Box>

        <div className={widthContainer}>
          <ClipboardCopyText
            text={props.connectedInfo.address}
            truncate="middle"
            className={copyText}
          />
        </div>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onDisconnect?.()}
            attributes={{
              width: "$full",
            }}
          >
            Disconnect
          </Button>
        </div>
      </Show>

      {/* Status notExist */}
      <Show when={props.status === "NotExist"}>
        <Box marginBottom="$7" className={statusLogo}>
          <div className={notExistLogoFrame[state.theme]} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.theme]}>{props.contentHeader}</p>

        <p className={clx(baseTextStyles, desc[state.theme])}>
          {props.contentDesc}
        </p>

        <div className={widthContainer}>
          <Button
            intent="primary"
            variant="outlined"
            onClick={() => props.onInstall?.()}
            disabled={!!props.disableInstall}
            attributes={{ width: "$full" }}
          >
            <Box
              as="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <span>{props.installIcon}</span>
              <Box as="span" marginLeft="$4">
                Install {props.wallet.prettyName ?? props.wallet.name}
              </Box>
            </Box>
          </Button>
        </div>
      </Show>

      {/* Status rejected */}
      <Show when={props.status === "Rejected"}>
        <Box marginBottom="$7" className={statusLogo}>
          <div className={notExistLogoFrame[state.theme]} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.theme]}>{props.contentHeader}</p>

        <p className={desc[state.theme]}>{props.contentDesc}</p>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onConnect?.()}
            attributes={{
              width: "$full",
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
          <div className={notExistLogoFrame[state.theme]} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={flexImg}
            />
          </div>
        </Box>

        <p className={dangerText[state.theme]}>{props.contentHeader}</p>

        <Box position="relative">
          <div className={errorDescription}>
            <p className={desc[state.theme]}>{props.contentDesc}</p>
          </div>
          <div className={bottomShadow[state.theme]} />
        </Box>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onChangeWallet?.()}
            attributes={{
              width: "$full",
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
