import { BaseComponentProps } from "../../models/components.model";
import type { ClassValue } from "clsx";

export interface ShowMoreProps {
  initialHeightPercent?:
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1;
  showMoreTitle?: string;
  showLessTitle?: string;
  children: BaseComponentProps["children"];
  className?: ClassValue;
}
