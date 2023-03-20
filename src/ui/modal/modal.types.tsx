import { BaseComponentProps } from "~/models/components.model";

export interface ModalProps extends BaseComponentProps<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}
