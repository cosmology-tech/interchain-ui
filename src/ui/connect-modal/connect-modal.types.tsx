import { BaseComponentProps } from "../../models/components.model";
import type { Wallet } from "../connect-modal-wallet-list/connect-modal-wallet-list.types";
import type { ConnectModalStatusProps } from "../connect-modal-status/connect-modal-status.types";

export type ConnectModalStep = "init" | "connecting" | "connectingMobile";

export const connectModalStepByValue: Record<ConnectModalStep, number> = {
  init: 0,
  connecting: 1,
  connectingMobile: 1,
};

export interface ConnectModalProps extends BaseComponentProps {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: BaseComponentProps["children"];
  title?: BaseComponentProps["children"];
  description?: BaseComponentProps["children"];
  closeButton?: BaseComponentProps["children"];
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
  wallets: Wallet[];
  // Status props
  status: ConnectModalStatusProps["status"];
  statusBottomLink?: ConnectModalStatusProps["bottomLink"];
  onConnect?: ConnectModalStatusProps["onConnect"];
  onDisconnect?: ConnectModalStatusProps["onDisconnect"];
  onChangeWallet?: ConnectModalStatusProps["onChangeWallet"];
  statusErrorInfo?: ConnectModalStatusProps["errorInfo"];
  statusConnectedInfo?: ConnectModalStatusProps["connectedInfo"];
}
