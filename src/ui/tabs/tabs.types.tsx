import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type TabProps = {
  label: string;
  content: BaseComponentProps["children"];
};

export interface TabsProps extends BaseComponentProps {
  defaultActiveTab?: number;
  activeTab?: number;
  onActiveTabChange?: (tabId: number) => void;
  tabs: TabProps[];
  attributes?: BoxProps;
}
