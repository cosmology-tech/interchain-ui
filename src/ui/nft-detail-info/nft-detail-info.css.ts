import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";

export const nftDetailInfo = style({
  minWidth: `${breakpoints.tablet}px`,
  boxSizing: "border-box",
});

export const verified = style({
  transform: "translateY(1px)",
});
