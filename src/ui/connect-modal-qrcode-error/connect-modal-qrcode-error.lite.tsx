import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
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
import {
  connectModalQRCodeErrorOverrides,
  connectModalQRCodeErrorButtonOverrides,
} from "./connect-modal-qrcode-error.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ConnectModalQrCodeError(
  props: ConnectModalQRCodeErrorProps,
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
    <div
      className={clx(qrcodeErrorContainer, qrCodeContainer, props.className)}
    >
      <div
        className={qrcodeBlur[state.internalTheme]}
        style={state.overrideManager?.applyOverrides(
          connectModalQRCodeErrorOverrides.name,
        )}
      />

      <div className={qrcodeReloadButtonContainer}>
        <button
          onClick={(event) => props.onRefresh?.(event)}
          className={qrcodeReloadButton[state.internalTheme]}
          style={state.overrideManager?.applyOverrides(
            connectModalQRCodeErrorButtonOverrides.name,
          )}
        >
          <span>
            <Icon name="restart" size="$lg" />
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
