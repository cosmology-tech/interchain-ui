import type { ClassValue } from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface LinkProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  href: string;
  target?: string;
  rel?: string;
  underline?: boolean;
  className?: ClassValue;
  children?: any;
  attributes?: Sprinkles;
}
