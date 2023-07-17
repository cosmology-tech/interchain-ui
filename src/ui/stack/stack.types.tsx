import type { ClassValue } from "clsx";
import type { CssVarValue } from "../../styles/rainbow-sprinkles.css";

export type StackProps = {
  as?: any;
  className?: ClassValue;
  children?: any;
  forwardedRef?: any;
  attributes?: any;
  recursive?: boolean;
  direction?: "vertical" | "horizontal";
  space?: CssVarValue | (string & {});
};

export const DEFAULT_VALUES = {
  as: "div",
};
