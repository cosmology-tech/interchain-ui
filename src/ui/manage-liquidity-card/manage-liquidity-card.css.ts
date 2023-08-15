import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  minWidth: "370px",
  backgroundColor: themeVars.colors.cardBg,
  paddingTop: themeVars.space[9],
  paddingRight: themeVars.space[10],
  paddingBottom: themeVars.space[10],
  paddingLeft: themeVars.space[9],
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      padding: themeVars.space[9],
    },
  },
});

export const poolBalanceContainer = style({
  marginRight: themeVars.space[8],
});

export const image = style({
  width: themeVars.space[8],
  height: themeVars.space[8],
});

export const tokenContainer = style({
  marginLeft: "120px",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      marginLeft: "0",
      width: "100%",
      marginTop: themeVars.space[11],
    },
  },
});
