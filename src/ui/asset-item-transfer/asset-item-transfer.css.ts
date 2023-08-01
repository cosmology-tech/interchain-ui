import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const buttonTextColorVar = createVar();

export const container = style({
  minWidth: "380px",
});

export const smImg = style({
  width: themeVars.space[11],
  height: themeVars.space[11],
  marginRight: themeVars.space[5],
});

export const img = style({
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const flex1 = style({
  flex: 1,
});

export const onlyLg = style({
  display: "flex",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "none",
    },
  },
});

export const onlySm = style({
  display: "none",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "flex",
    },
  },
});

const btnTextBase = style({
  color: buttonTextColorVar,
});

export const btnText = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
      },
    }),
    btnTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
      },
    }),
    btnTextBase,
  ],
});
