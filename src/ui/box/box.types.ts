import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { Resolve } from "../../helpers/types";

export type BoxProps = Resolve<Sprinkles> & {
  as?: any;
  className?: string;
  class?: string;
  children?: any;
  attributes?: any;
  rawCSS?: any;
  boxRef?: any;
};

export const DEFAULT_VALUES = {
  as: "div",
};
