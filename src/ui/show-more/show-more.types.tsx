import { BaseComponentProps } from "../../models/components.model";

type Percentage = 0|0.1|0.2|0.3|0.4|0.5|0.6|0.7|0.8|0.9|1;
;

export interface ShowMoreProps {
  initialHeightPercent?: Percentage,
  showMoreTitle?: string,
  showLessTitle?: string,
  children: BaseComponentProps["children"];
}
