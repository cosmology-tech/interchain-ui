import { BaseComponentProps } from "../../models/components.model";
import type { Wallet } from "../connect-modal-wallet-list/connect-modal-wallet-list.types";

export interface ConnectedInfo {
  name?: string;
  avatar?: any;
  address: string;
}

export type ConnectionStatus =
  | "Disconnected"
  | "Connecting"
  | "Connected"
  | "NotExist"
  | "Rejected"
  | "Error";

export interface ConnectModalStatusProps extends BaseComponentProps {
  wallet: Wallet;
  status: ConnectionStatus;
  contentHeader?: string;
  contentDesc?: string;
  bottomLink?: string;
  // disconnected props
  onConnect?: () => void;
  // connected props
  connectedInfo?: ConnectedInfo;
  onDisconnect?: () => void;
  onChangeWallet?: () => void;
  // notExist props
  disableInstall?: boolean;
  onInstall?: () => void;
  installIcon?: BaseComponentProps["children"];
}
