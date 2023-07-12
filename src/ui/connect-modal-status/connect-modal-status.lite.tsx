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
  statusLogoImageSvg,
  widthContainer,
} from "./connect-modal-status.css";
import { baseTextStyles } from "../text/text.css";
import { bottomShadow } from "../shared/shared.css";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

export default function ConnectModalStatus(props: ConnectModalStatusProps) {
  return (
    <div className={clx(modalStatusContainer, props.className)}>
      {/* Status disconnected */}
      <Show when={props.status === "Disconnected"}>
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

        <div className={widthContainer}>
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
      <Show when={props.status === "Connecting"}>
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
          {props.contentHeader}
        </p>

        <p
          className={s({
            fontSize: "sm",
            color: "body",
            fontWeight: "normal",
            textAlign: "center",
          })}
        >
          {props.contentDesc}
        </p>
      </Show>

      {/* Status connected */}
      <Show when={props.status === "Connected"}>
        <div
          className={clx(
            statusLogo,
            s({
              marginBottom: "8",
            })
          )}
        >
          <Show when={typeof props.connectedInfo.avatar === "string"}>
            <div className={statusLogoImage}>
              <img
                src={props.connectedInfo.avatar}
                alt={props.connectedInfo.name}
                className={s({ width: "full", height: "full" })}
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

          <Show when={!!props.connectedInfo?.name}>
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
              {props.connectedInfo.name}
            </p>
          </Show>
        </div>

        <div className={widthContainer}>
          <ClipboardCopyText
            text={props.connectedInfo.address}
            truncate="middle"
            className={s({
              marginBottom: "7",
            })}
          />
        </div>

        <div className={widthContainer}>
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
      <Show when={props.status === "NotExist"}>
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
          {props.contentHeader}
        </p>

        <p
          className={clx(
            baseTextStyles,
            s({
              fontSize: "sm",
              marginBottom: "4",
              color: {
                light: "gray600",
                dark: "whiteAlpha900",
              },
              fontWeight: "normal",
              textAlign: "center",
            })
          )}
        >
          {props.contentDesc}
        </p>

        <div className={widthContainer}>
          <Button
            intent="primary"
            variant="outlined"
            onClick={() => props.onInstall?.()}
            className={s({ width: "full" })}
            disabled={!!props.disableInstall}
          >
            <span
              className={s({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              <span>{props.installIcon}</span>
              <span
                className={s({
                  marginLeft: "4",
                })}
              >
                Install {props.wallet.prettyName ?? props.wallet.name}
              </span>
            </span>
          </Button>
        </div>
      </Show>

      {/* Status rejected */}
      <Show when={props.status === "Rejected"}>
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
          {props.contentHeader}
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
          {props.contentDesc}
        </p>

        <div className={widthContainer}>
          <Button
            leftIcon="walletFilled"
            onClick={() => props.onConnect?.()}
            className={s({
              width: "full",
              marginBottom: "3",
            })}
          >
            Reconnect
          </Button>
        </div>
      </Show>

      {/* Status error */}
      <Show when={props.status === "Error"}>
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
          {props.contentHeader}
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
              {props.contentDesc}
            </p>
          </div>
          <div className={bottomShadow} />
        </div>

        <div className={widthContainer}>
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
