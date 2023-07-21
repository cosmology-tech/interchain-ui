import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";

export const nftDetail = style({
  minWidth: `${breakpoints.tablet}px`,
});

export const traitItemBox = style({
  width: `calc(50% - 12px)`,
  boxSizing: "border-box",
});
