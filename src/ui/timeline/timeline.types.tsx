import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type TimelineEvent = {
  timestamp: string;
  title?: string;
  description?: string;
  className?: string;
  customContent?: BaseComponentProps["children"];
};

export interface TimelineProps extends BaseComponentProps {
  events: TimelineEvent[];
  attributes?: BoxProps;
}
