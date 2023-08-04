import { BaseComponentProps } from "../../models/components.model";
import type { ClassValue } from "clsx";

export interface ShowMoreProps {
  heightToShowMore?: number;
  showMoreTitle?: string;
  showLessTitle?: string;
  children: BaseComponentProps["children"];
  className?: ClassValue;
}
