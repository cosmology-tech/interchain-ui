import { BaseComponentProps } from "../../models/components.model";

export interface BasicModalProps extends BaseComponentProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  title: string;
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
  modalContentClassName?: string;
}
