import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  sprinkles as s,
  RequiredResponsiveObject,
} from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { breakpoints } from "../../styles/tokens";

export const container = style([
  {
    minWidth: "400px",
    marginTop: "27px",
    transition: "ease all .5s",
    flexWrap: "nowrap",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        flexWrap: "wrap",
      },
    },
  },
]);

const base = style([
  s({
    px: "8",
    py: "9",
  }),
  {
    display: "flex",
    alignItems: "center",
    borderRadius: "7px",
    minHeight: "92px",
    boxSizing: "border-box"
  },
]);
export const mb3 = style({
  marginBottom: "3px",
});

export const image = style({
  width: "53px",
  height: "53px",
  marginRight: "21px",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
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
    // maxWidth: "234px",
    height: "fit-content",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
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
    height: "fit-content",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
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

export const flex1 = style([
  s({
    paddingRight: "5",
  }),
  {
    flex: 1,
    overflow: "hidden"
  },
]);
