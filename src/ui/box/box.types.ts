import type { ClassValue } from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type BoxProps = Sprinkles & {
  as?: any;
  className?: ClassValue;
  children?: any;
  forwardedRef?: any;
  attributes?: any;
  style?: any;
  boxRef?: any;
};

export const DEFAULT_VALUES = {
  as: "div",
};
