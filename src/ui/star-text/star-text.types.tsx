import type { BaseComponentProps } from "../../models/components.model";

export interface StarTextProps extends BaseComponentProps {
  label?: string;
  value: string | number;
  tokenName?: string;
  iconSrc?: string;
  onClick?: (event?: any) => void;
}
