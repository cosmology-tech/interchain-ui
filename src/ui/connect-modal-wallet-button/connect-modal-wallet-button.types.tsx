import { BaseComponentProps } from "../../models/components.model";
import type { ConnectButtonVariants } from "./connect-modal-wallet-button.css";

export interface ConnectModalWalletButtonProps extends BaseComponentProps {
  variant?: ConnectButtonVariants["variant"];
  logo: string;
  subLogo?: string;
  isMobile: boolean;
  name: string;
  prettyName?: string;
  onClick?: any;
}
