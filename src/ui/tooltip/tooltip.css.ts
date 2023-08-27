import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";

export const tooltip = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  cursor: "help",
});
