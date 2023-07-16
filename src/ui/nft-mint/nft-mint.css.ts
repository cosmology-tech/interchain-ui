import { style, createVar } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";


export const nftMint = style({
  minWidth: breakpoints.tablet,
});

export const tip = style({
  borderRadius: "40px",
});
