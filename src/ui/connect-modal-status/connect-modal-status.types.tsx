import { BaseComponentProps } from "../../models/components.model";
import type { Wallet } from "../connect-modal-wallet-list/connect-modal-wallet-list.types";

export interface ConnectedInfo {
  name?: string;
  avatarUrl: string;
  address: string;
}

export interface ErrorInfo {
  message: string;
}

export interface ConnectModalStatusProps extends BaseComponentProps {
  wallet: Wallet;
  status:
    | "disconnected"
    | "connecting"
    | "connected"
    | "notExist"
    | "rejected"
    | "error";
  bottomLink?: string;
  // disconnected props
  onConnect?: () => void;
  // connected props
  connectedInfo?: ConnectedInfo;
  onDisconnect?: () => void;
  // error props
  errorInfo?: ErrorInfo;
  onChangeWallet?: () => void;
}
