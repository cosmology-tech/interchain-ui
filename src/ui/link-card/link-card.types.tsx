import { IconName } from "../icon/icon.types";

export interface LinkCardProps {
  url: string;
  icon: IconName;
  title: string;
  description: string;
  width?: string;
  height?: string;
  openInNewTab?: boolean;
}
