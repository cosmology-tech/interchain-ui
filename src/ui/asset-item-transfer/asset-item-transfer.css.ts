import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const buttonTextColorVar = createVar();

export const container = style({
  minWidth: "380px",
});

export const smImg = sprinkles({
  width: "11",
  height: "11",
  marginRight: "5",
});

export const img = sprinkles({
  width: "15",
  height: "15",
});

export const flex1 = style({
  flex: 1,
});

export const onlyLg = style({
  display: "flex",
  "@media": {
    [`screen and (max-width: 500px)`]: {
      display: "none",
    },
  },
});

export const onlySm = style({
  display: "none",
  "@media": {
    [`screen and (max-width: 500px)`]: {
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
