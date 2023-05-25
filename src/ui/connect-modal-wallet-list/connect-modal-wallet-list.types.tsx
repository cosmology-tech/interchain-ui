import { BaseComponentProps } from "../../models/components.model";

export interface Wallet {
  name: string;
  logo: string;
  mobileDisabled: boolean;
  rejectMessage?: string;
}

export interface ConnectModalWalletListProps extends BaseComponentProps {
  wallets: Wallet[];
  onWalletItemClick?: (wallet: Wallet) => void;
  className?: string;
}
