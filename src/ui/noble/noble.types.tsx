import type { BaseComponentProps } from "../../models/components.model";

export interface NobleProviderProps extends BaseComponentProps {}

export interface NobleTxDirectionCardProps extends BaseComponentProps {
  direction: string;
  chainName: string;
  address: string;
  logoUrl: string;
  addressDisplayLength?: number;
}
