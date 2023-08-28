import type { ClassValue } from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { Resolve } from "../../helpers/types";

export type BoxProps = Resolve<Sprinkles> & {
  as?: any;
  className?: ClassValue;
  children?: any;
  attributes?: any;
  style?: any;
  boxRef?: any;
};

export const DEFAULT_VALUES = {
  as: "div",
};
