import { BaseComponentProps } from "../../models/components.model";

export interface Wallet {
  name: string;
  prettyName?: string;
  logo: string;
  isMobile: boolean;
  mobileDisabled: boolean;
  downloadUrl?: string;
  rejectMessage?: string;
}

export interface ConnectModalWalletListProps extends BaseComponentProps {
  wallets: Wallet[];
  onWalletItemClick?: (wallet: Wallet) => void;
  className?: string;
}
