import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const container = style([
  s({
    paddingTop: "9",
    paddingRight: "10",
    paddingBottom: "10",
    paddingLeft: "9",
  }),
  {
    minWidth: "350px",
    backgroundColor: themeVars.colors.cardBg,
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        padding: themeVars.space[9],
      },
    },
  },
]);

export const poolBalanceContainer = s({
  marginRight: "8",
});

export const image = s({
  width: "8",
  height: "8",
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
