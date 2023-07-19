import type { ClassValue } from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";
import { space } from "../../styles/tokens";

export interface StackProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  className?: ClassValue;
  children?: any;
  forwardedRef?: any;
  attributes?: Sprinkles;
  recursive?: boolean;
  direction?: "vertical" | "horizontal";
  space?: `$${keyof typeof space}` | (string & {});
}

export const DEFAULT_VALUES = {
  as: "div",
};
