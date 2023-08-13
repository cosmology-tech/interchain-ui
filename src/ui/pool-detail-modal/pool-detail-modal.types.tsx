import { PoolListItemProps } from "../pool-list-item/pool-list-item.types";

export interface PoolDetailModalProps extends PoolListItemProps {
  isOpen: boolean;
  onClose?: () => void
}
