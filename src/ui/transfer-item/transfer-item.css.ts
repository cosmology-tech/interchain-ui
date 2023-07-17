import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const textButtonBgVar = createVar();

export const container = style({
  minWidth: "468px",
});

export const img = sprinkles({
  width: "15",
  height: "15",
});

export const dropdowBtn = style({
  padding: "0 !important",
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
