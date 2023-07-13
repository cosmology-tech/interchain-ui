import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { sprinkles } from "../../styles/sprinkles.css";

const buttonTextColorVar = createVar();
const textButtonBgVar = createVar();

export const overviewTransfer = style({
  minWidth: "670px",
});

export const img = sprinkles({
  width: "15",
  height: "15",
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

const textBtnBase = style({
  color: themeVars.colors.white,
  backgroundColor: textButtonBgVar,
});

export const textBtn = styleVariants({
  light: [
    style({
      vars: {
        [textButtonBgVar]: "#A2AEBB",
      },
    }),
    textBtnBase,
  ],
  dark: [
    style({
      vars: {
        [textButtonBgVar]: "#434B55",
      },
    }),
    textBtnBase,
  ],
});
