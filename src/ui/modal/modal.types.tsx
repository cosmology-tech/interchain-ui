import { BaseComponentProps, Children } from "~/models/components.model";

export interface ModalProps extends BaseComponentProps<HTMLDivElement> {
  defaultOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  id?: string;
  backdropClassName?: string;
  backdropProps?: any;
  title?: Children;
  renderTrigger: (triggerProps: any) => Children;
  renderContent: ({ isOpen }: { isOpen: boolean }) => Children;
}
