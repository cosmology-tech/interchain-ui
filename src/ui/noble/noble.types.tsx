import type { BaseComponentProps } from "../../models/components.model";
import { BoxProps } from "../box/box.types";

export interface NobleProviderProps extends BaseComponentProps {}

export interface NobleTxDirectionCardProps extends BaseComponentProps {
  direction: string;
  chainName: string;
  address: string;
  logoUrl: string;
  addressDisplayLength?: number;
}

export interface NobleTxProgressBarProps extends BaseComponentProps {
  progress: number;
  width?: BoxProps["width"];
  mx?: BoxProps["mx"];
  my?: BoxProps["my"];
  mt?: BoxProps["mt"];
  mb?: BoxProps["mb"];
}
