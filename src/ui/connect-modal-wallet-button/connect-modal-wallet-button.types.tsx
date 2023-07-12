import { BaseComponentProps } from "../../models/components.model";
import type { ConnectButtonVariants } from "./connect-modal-wallet-button.css";
import type { LiteralUnion } from "../../helpers/types";

export interface ConnectModalWalletButtonProps extends BaseComponentProps {
  variant?: ConnectButtonVariants["variant"];
  logo: string;
  subLogo?: LiteralUnion<"walletConnect", string>;
  name: string;
  prettyName?: string;
  onClick?: any;
}
