import { BaseComponentProps } from "../../models/components.model";

export interface WalletConnectModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose?: () => void;
}
