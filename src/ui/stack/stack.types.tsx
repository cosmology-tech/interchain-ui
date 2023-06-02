import type { OptionalResponsiveObject } from "../../styles/sprinkles.css";
import type { BoxProps } from "../box/box.types";

export interface StackProps extends BoxProps {
  align?: BoxProps["alignItems"];
  children?: any;
  flex?: BoxProps["flex"];
  justify?: BoxProps["justifyContent"];
  space?: BoxProps["gap"];
  wrap?: OptionalResponsiveObject<true | false>;
  direction?: "row" | "column";
  className?: BoxProps["className"];
  attributes?: BoxProps;
}
