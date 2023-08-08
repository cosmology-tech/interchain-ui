import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const textButtonBgVar = createVar();

export const container = style({
  minWidth: "468px",
});

export const img = style({
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const dropdowBtn = style({
  padding: "0",
});

const textBtnBase = style({
  color: themeVars.colors.white,
  backgroundColor: textButtonBgVar,
});

export const textBtn = styleVariants({
  light: [
    textBtnBase,
    style({
      vars: {
        [textButtonBgVar]: "#A2AEBB",
      },
    }),
  ],
  dark: [
    textBtnBase,
    style({
      vars: {
        [textButtonBgVar]: "#434B55",
      },
    }),
  ],
});

export const transferInput = style({
  // border: "0",
  // outline: "0",
  fontSize: themeVars.fontSize["2xl"],
  textAlign: "right"
});
