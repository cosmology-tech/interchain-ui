import { BaseComponentProps } from "../../models/components.model";

export interface ClipboardCopyTextProps extends BaseComponentProps {
  text: string;
  onCopied?: () => void;
  className?: string;
}
