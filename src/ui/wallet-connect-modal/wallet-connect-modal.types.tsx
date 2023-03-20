import { BaseComponentProps } from "~/models/components.model";

export interface WalletConnectModalProps
  extends BaseComponentProps<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}
