import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type BoxProps<T = any> = Sprinkles & {
  as?: any;
  className?: string;
  class?: string;
  children?: any;
  attributes?: any;
  rawCSS?: any;
  boxRef?: T;
};

export const DEFAULT_VALUES = {
  as: "div",
};
