import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens/breakpoints";

export const bondingAreaContainer = style({
  minWidth: "350px",
});

export const onlyDesktop = style({
  display: "flex",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "none",
    },
  },
});

export const onlySm = style({
  display: "none",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "flex",
    },
  },
});
