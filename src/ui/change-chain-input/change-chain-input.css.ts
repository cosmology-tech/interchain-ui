import { style } from "@vanilla-extract/css";

export const textFieldRoot = style({
  position: "relative",
});

export const chainItem = style({
  position: "absolute",
  zIndex: 2,
  top: "50%",
  transform: "translateY(-50%)",
  left: "20px",
});
