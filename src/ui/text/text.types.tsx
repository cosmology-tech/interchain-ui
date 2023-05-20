import type { BoxProps } from "../box/box.types";
import type { Variants } from "./text.css";

export interface TextProps extends BoxProps, Variants {
  align?: BoxProps["textAlign"];
  as?:
    | "code"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "p"
    | "span";
  children?: any;
  color?: BoxProps["color"];
  letterSpacing?: BoxProps["letterSpacing"];
  lineHeight?: BoxProps["lineHeight"];
  size?: BoxProps["fontSize"];
  transform?: BoxProps["textTransform"];
  weight?: BoxProps["fontWeight"];
  whiteSpace?: BoxProps["whiteSpace"];
  wordBreak?: BoxProps["wordBreak"];
  underline?: boolean;
  className?: BoxProps["className"];
}
