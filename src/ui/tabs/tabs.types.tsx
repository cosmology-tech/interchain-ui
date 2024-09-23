import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type TabProps = {
  label: string;
  content: BaseComponentProps["children"];
};

export type TabSize = "sm" | "md";
export type TabVariant = "pill" | "line";

export interface TabsProps extends BaseComponentProps {
  variant?: TabVariant;
  size?: TabSize;
  defaultActiveTab?: number;
  activeTab?: number;
  // Whether or not to mount/unmount tab children on activeTab change, isLazy = true means unmount
  isLazy?: boolean;
  onActiveTabChange?: (tabId: number) => void;
  tabs: TabProps[];
  attributes?: BoxProps;
}
