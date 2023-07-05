import { BaseComponentProps } from "../../models/components.model";

export interface ClipboardCopyTextProps extends BaseComponentProps {
  text: string;
  truncate?: "middle" | "end";
  midTruncateLimit?: "sm" | "md" | "lg";
  onCopied?: () => void;
  className?: string;
}
