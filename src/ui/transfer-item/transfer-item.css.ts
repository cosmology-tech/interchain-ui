import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";

const textButtonBgVar = createVar();

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
  fontSize: themeVars.fontSize["2xl"],
  textAlign: "right",
  width: themeVars.space[24],
  paddingLeft: '0',
  paddingRight: '0',
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      width: themeVars.space[28]
    },
  },
});

export const comboboxContainer = style({
  borderBottomLeftRadius: themeVars.radii.lg,
  borderBottomRightRadius: themeVars.radii.lg,
})
