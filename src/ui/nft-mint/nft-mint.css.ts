import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const nftMint = style({
  minWidth: breakpoints.tablet,
});

export const tip = style({
  borderRadius: "40px",
});

export const baseInput = style({
  // height: themeVars.space["15"],
  fontSize: themeVars.fontSize["lg"],
  fontWeight: themeVars.fontWeight["semibold"],
})

export const starContainer = style({
  top: "50%",
  right: themeVars.space["10"],
  transform: "translateY(-50%)"
})
