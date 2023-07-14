import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import clx from "clsx";
import type { ConnectModalQRCodeErrorProps } from "./connect-modal-qrcode-error.types";
import QRCode from "../qrcode";
import Icon from "../icon";
import {
  qrcodeErrorContainer,
  qrcodeBlur,
  qrcodeReloadButton,
  qrcodeReloadButtonContainer,
} from "./connect-modal-qrcode-error.css";
import {
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
} from "../connect-modal-qrcode/connect-modal-qrcode.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";

export default function ConnectModalQrCodeError(
  props: ConnectModalQRCodeErrorProps
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
    <div
      className={clx(qrcodeErrorContainer, qrCodeContainer, props.className)}
    >
      <div className={qrcodeBlur[state.theme]} />

      <div className={qrcodeReloadButtonContainer}>
        <button
          onClick={() => props.onRefresh?.()}
          className={qrcodeReloadButton[state.theme]}
        >
          <span>
            <Icon name="restart" size="lg" />
          </span>
        </button>
      </div>

      <QRCode
        value={"https://"}
        size={props.qrCodeSize}
        bgColor={qrCodeBgVar}
        fgColor={qrCodeFgVar}
        level={"L"}
        includeMargin={false}
      />
    </div>
  );
}
