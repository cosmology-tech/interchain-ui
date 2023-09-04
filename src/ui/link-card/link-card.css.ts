import { style } from "@vanilla-extract/css";

export const container = style({
  textDecoration: "none",
  transition: "all 0.1s linear",
  ":hover": {
    background: "#EEF2F8",
  },
});
