import { BaseComponentProps } from "../../models/components.model";

export interface ConnectModalProps extends BaseComponentProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  header: BaseComponentProps["children"];
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
}
