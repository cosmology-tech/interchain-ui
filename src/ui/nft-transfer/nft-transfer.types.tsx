import type { BaseComponentProps } from "../../models/components.model";

export interface NftTransferProps extends BaseComponentProps {
  onChange?: (event?: any) => void;
  onTransfer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  disabled?: boolean;
  placeholder?: string;
}
