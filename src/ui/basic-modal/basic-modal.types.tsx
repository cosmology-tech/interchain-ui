import { BaseComponentProps } from "../../models/components.model";

export interface BasicModalProps extends BaseComponentProps {
  isOpen: boolean;
  onOpen?: (event?: any) => void;
  onClose?: (event?: any) => void;
  title: BaseComponentProps["children"];
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
  modalContentClassName?: string;
}
