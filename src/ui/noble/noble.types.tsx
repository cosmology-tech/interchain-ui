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
  mt?: BoxProps["mt"];
  mb?: BoxProps["mb"];
}

export interface NobleTxStepItemProps extends BaseComponentProps {
  step: string;
  status: "completed" | "processing" | "pending";
}
