import { style, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";

const buttonTextColorVar = createVar();
const textButtonBgVar = createVar();

export const container = style({
  minWidth: "480px"
})

export const img = style({
  width: "50px",
  height: "50px",
});

export const btnText =  style({
  vars: {
    [buttonTextColorVar]: themeVars.colors.white,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
      },
    },
  },
  color: buttonTextColorVar,
})

export const textBtn = style({
  vars: {
    [textButtonBgVar]: "#A2AEBB",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [textButtonBgVar]: "#434B55",
      },
    },
  },
  color: themeVars.colors.white,
  backgroundColor: textButtonBgVar,
})
