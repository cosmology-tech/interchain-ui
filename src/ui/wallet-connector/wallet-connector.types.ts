import type { BaseComponentProps } from "../../models/components.model";
import type { ConnectionStatus } from "../connect-modal-status/connect-modal-status.types";
import type { Wallet } from "../connect-modal-wallet-list/connect-modal-wallet-list.types";
import type { BoxProps } from "../box/box.types";

export interface WalletConnectorFrameProps extends BaseComponentProps {
  attributes?: BoxProps["attributes"];
}

export interface WalletConnectorInfoProps extends BaseComponentProps {
  iconSrc?: string;
  address?: string;
  mode?: "qr" | "simple";
  truncateLength?: number;
  onDisconnect?: () => void;
  onCopyAddress?: () => void;
}

type StatusRingPopoverAction = "reload" | "close";

export interface WalletConnectorStatusRingProps extends BaseComponentProps {
  status: ConnectionStatus;
  wallet: Wallet;
  popoverAction?: {
    type: StatusRingPopoverAction;
    label: string;
    onClick?: () => void;
  };
  attributes?: BoxProps["attributes"];
}

// ==== Status states
export type ConnectingStatusState = {
  title: string;
  description: string;
};

export type ConnectedStatusState = {};

export type NotExistStatusState = {
  title: string;
  description: string;
  installButtonLabel?: string;
  popoverAction?: WalletConnectorStatusRingProps["popoverAction"];
};

export type WalletConnectorStatusState = {
  Connecting?: ConnectingStatusState;
  Connected?: ConnectedStatusState;
  NotExist?: NotExistStatusState;
};

export interface WalletConnectorStatusProps extends BaseComponentProps {
  wallet: Wallet;
  status: ConnectionStatus;
  state: WalletConnectorStatusState;
}

export interface WalletConnectorWalletListProps extends BaseComponentProps {}

export interface WalletConnectorQRCodeProps extends BaseComponentProps {}

export interface WalletConnectorHeadProps extends BaseComponentProps {
  id?: string;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
  attributes?: BoxProps["attributes"];
}
