import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style([
  {
    minWidth: "450px",
    transition: "ease all .5s",
    flexWrap: "nowrap",
    "@media": {
      [`screen and (max-width: 900px)`]: {
        flexWrap: "wrap",
      },
    },
  },
]);

const base = style({
  paddingLeft: themeVars.space[8],
  paddingRight: themeVars.space[8],
  display: "flex",
  alignItems: "center",
  borderRadius: "7px",
  height: "92px",
  boxSizing: "border-box",
});

export const mb3 = style({
  marginBottom: "3px",
});

export const image = style({
  width: "53px",
  height: "53px",
  marginRight: "21px",
  "@media": {
    [`screen and (max-width: 900px)`]: {
      width: "40px",
      height: "40px",
      marginRight: "13px",
    },
  },
});

export const semocolon = style({
  margin: "0 8px",
});

export const dollar = style({
  marginBottom: "5px",
});

export const baseBox = style([
  base,
  {
    backgroundColor: themeVars.colors.cardBg,
    width: "234px",
    "@media": {
      [`screen and (max-width: 900px)`]: {
        width: "calc(50% - 12px)",
        maxWidth: "calc(50% - 12px)",
        minWidth: "179px",
      },
    },
  },
]);

export const rewardBox = style([
  base,
  {
    backgroundColor: themeVars.colors.rewardBg,
    color: themeVars.colors.rewardContent,
    width: "234px",
    maxWidth: "234px",
    "@media": {
      [`screen and (max-width: 900px)`]: {
        width: "100%",
        maxWidth: "100%",
        minWidth: "382px",
      },
    },
  },
]);

export const osom = style({
  margin: "0 14px 3px 2px",
});

export const flex1 = style({
  paddingRight: themeVars.space[5],
  flex: 1,
  overflow: "hidden",
});
