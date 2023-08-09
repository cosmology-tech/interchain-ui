import { style, styleVariants, createVar } from "@vanilla-extract/css";


export const borderless = style({
  border: "0",
  padding: "0",
  selectors: {
    "&:focus": {
      boxShadow: "none"
    }
  }
});
