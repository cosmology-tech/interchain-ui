import clx from "clsx";
import { sprinkles as s } from "../../styles/sprinkles.css";
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

export default function ConnectModalQrCodeError(
  props: ConnectModalQRCodeErrorProps
) {
  return (
    <div
      className={clx(qrcodeErrorContainer, qrCodeContainer, props.className)}
    >
      <div className={qrcodeBlur} />

      <div className={qrcodeReloadButtonContainer}>
        <button
          onClick={() => props.onRefresh?.()}
          className={qrcodeReloadButton}
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
