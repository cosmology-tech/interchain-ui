import { BaseComponentProps } from "../../models/components.model";
import type { ConnectModalWalletButtonProps } from "../connect-modal-wallet-button/connect-modal-wallet-button.types";

export interface Wallet {
  name: string;
  prettyName?: string;
  logo: string;
  isMobile: boolean;
  mobileDisabled: boolean;
  downloadUrl?: string;
  rejectMessage?: string;
  originalWallet?: any;
  shape?: ConnectModalWalletButtonProps["variant"];
}

export interface ConnectModalWalletListProps extends BaseComponentProps {
  wallets: Wallet[];
  onWalletItemClick?: (wallet: any) => void;
  className?: string;
}
