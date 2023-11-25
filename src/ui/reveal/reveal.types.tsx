import { BaseComponentProps } from "../../models/components.model";
import type { ClassValue } from "clsx";

export interface RevealProps {
  hideThresholdHeight?: number;
  showMoreLabel?: string;
  showLessLabel?: string;
  children: BaseComponentProps["children"];
  className?: ClassValue;
}
