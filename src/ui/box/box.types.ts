import type { ClassValue } from "clsx";
import type { Sprinkles } from "../../styles/sprinkles.css";

export type BoxProps = Sprinkles & {
  as?: any;
  className?: ClassValue;
  children?: any;
  forwardedRef?: any;
  attributes?: any;
};

export const DEFAULT_VALUES = {
  as: "div",
};
