import { BaseComponentProps } from "../../models/components.model";
import type { ConnectButtonVariants } from "./connect-modal-wallet-button.css";
import type { LiteralUnion } from "type-fest";

export interface ConnectModalWalletButtonProps extends BaseComponentProps {
  variant?: ConnectButtonVariants["variant"];
  logo: string;
  subLogo?: LiteralUnion<"walletConnect", string>;
  btmLogo?: LiteralUnion<"MetaMask", string>;
  name: string;
  prettyName?: string;
  badge?: string;
  onClick?: any;
}
