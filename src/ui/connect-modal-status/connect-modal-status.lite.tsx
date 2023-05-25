import { Show } from "@builder.io/mitosis";
import clx from "clsx";
import Button from "../button";
import ClipboardCopyText from "../clipboard-copy-text";
import { sprinkles as s } from "../../styles/sprinkles.css";
import {
  statusLogo,
  disconnectedLogoFrame,
  statusLogoImage,
  modalStatusContainer,
  connectingLogoFrame,
  notExistLogoFrame,
  errorDescription,
  bottomShadow,
} from "./connect-modal-status.css";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

export default function ConnectModalStatus(props: ConnectModalStatusProps) {
  return (
    <div className={clx(modalStatusContainer, props.className)}>
      {/* Status disconnected */}
      <Show when={props.status === "disconnected"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "5",
            })
          )}
        >
          <div className={disconnectedLogoFrame} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <p
          className={s({
            fontWeight: "semibold",
            marginBottom: "7",
            color: {
              light: "orange300",
              dark: "orange500",
            },
          })}
        >
          Wallet is disconnected
        </p>

        <div
          className={s({
            width: "full",
          })}
        >
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onConnect?.()}
            className={s({
              width: "full",
              marginBottom: "3",
            })}
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
              className={s({
                fontSize: "sm",
                color: "body",
                fontWeight: "normal",
              })}
            >
              Don't have a wallet?
            </a>
          </div>
        </Show>
      </Show>
      {/* Status connecting */}
      <Show when={props.status === "connecting"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "8",
            })
          )}
        >
          <div className={connectingLogoFrame} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <p
          className={s({
            marginBottom: "1",
            fontSize: "md",
            fontWeight: "semibold",
            color: {
              light: "gray700",
              dark: "white",
            },
          })}
        >
          Connecting Wallet
        </p>

        <p
          className={s({
            fontSize: "sm",
            color: "body",
            fontWeight: "normal",
            textAlign: "center",
          })}
        >
          Open browser extension/app to connect your wallet.
        </p>
      </Show>

      {/* Status connected */}
      <Show when={props.status === "connected"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "8",
            })
          )}
        >
          <div className={statusLogoImage}>
            <img
              src={props.connectedInfo.avatarUrl}
              alt={props.connectedInfo.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <div
          className={s({
            display: "flex",
            alignItems: "center",
            marginBottom: "5",
          })}
        >
          <img
            src={props.wallet.logo}
            alt={props.wallet.name}
            className={s({
              width: "8",
              height: "8",
            })}
          />
          <p
            className={s({
              fontSize: "md",
              fontWeight: "semibold",
              marginLeft: "4",
              color: {
                light: "gray700",
                dark: "white",
              },
            })}
          >
            {props.connectedInfo.name ?? props.connectedInfo.address}
          </p>
        </div>

        <ClipboardCopyText
          text={props.connectedInfo.address}
          className={s({
            marginBottom: "7",
          })}
        />

        <div
          className={s({
            width: "full",
          })}
        >
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onDisconnect?.()}
            className={s({
              width: "full",
            })}
          >
            Disconnect
          </Button>
        </div>
      </Show>

      {/* Status notExist */}
      <Show when={props.status === "notExist"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "7",
            })
          )}
        >
          <div className={notExistLogoFrame} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <p
          className={s({
            fontWeight: "semibold",
            marginBottom: "2",
            color: {
              light: "red300",
              dark: "red400",
            },
          })}
        >
          Wallet Not Installed
        </p>

        <p
          className={s({
            fontSize: "sm",
            marginBottom: "4",
            color: {
              light: "gray700",
              dark: "whiteAlpha900",
            },
            fontWeight: "normal",
            textAlign: "center",
          })}
        >
          Please install wallet
        </p>

        <div className={s({ width: "full" })}>
          <Button
            intent="primary"
            variant="outlined"
            leftIcon="chromeBrowser"
            className={s({ width: "full" })}
          >
            Install {props.wallet.name}
          </Button>
        </div>
      </Show>

      {/* Status rejected */}
      <Show when={props.status === "rejected"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "7",
            })
          )}
        >
          <div className={notExistLogoFrame} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <p
          className={s({
            fontWeight: "semibold",
            marginBottom: "2",
            color: {
              light: "red300",
              dark: "red400",
            },
          })}
        >
          Request Rejected
        </p>

        <p
          className={s({
            fontSize: "sm",
            marginBottom: "4",
            color: {
              light: "gray700",
              dark: "whiteAlpha900",
            },
            fontWeight: "normal",
            textAlign: "center",
          })}
        >
          Connection permission is denied.
        </p>

        <div
          className={s({
            width: "full",
          })}
        >
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onConnect?.()}
            className={s({
              width: "full",
              marginBottom: "3",
            })}
          >
            Connect wallet
          </Button>
        </div>
      </Show>

      {/* Status error */}
      <Show when={props.status === "error"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "7",
            })
          )}
        >
          <div className={notExistLogoFrame} />
          <div className={statusLogoImage}>
            <img
              src={props.wallet.logo}
              alt={props.wallet.name}
              className={s({ width: "full", height: "full" })}
            />
          </div>
        </div>

        <p
          className={s({
            fontWeight: "semibold",
            marginBottom: "2",
            color: {
              light: "red300",
              dark: "red400",
            },
          })}
        >
          Oops! Something wrong...
        </p>

        <div className={s({ position: "relative" })}>
          <div className={errorDescription}>
            <p
              className={s({
                fontSize: "sm",
                marginBottom: "4",
                color: {
                  light: "gray700",
                  dark: "whiteAlpha900",
                },
                fontWeight: "normal",
                textAlign: "center",
              })}
            >
              {props.errorInfo?.message}
            </p>
          </div>
          <div className={bottomShadow} />
        </div>

        <div
          className={s({
            width: "full",
          })}
        >
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onChangeWallet?.()}
            className={s({
              width: "full",
              marginBottom: "3",
            })}
          >
            Change wallet
          </Button>
        </div>
      </Show>
    </div>
  );
}