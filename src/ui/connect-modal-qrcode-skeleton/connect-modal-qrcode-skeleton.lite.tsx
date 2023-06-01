import clx from "clsx";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { qrcodeSkeleton } from "./connect-modal-qrcode-skeleton.css";

export default function ConnectModalQrCodeSkeleton(props) {
  return (
    <div
      className={clx(
        s({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "full",
          px: "6",
        }),
        props.className
      )}
    >
      <div className={qrcodeSkeleton} />
    </div>
  );
}
