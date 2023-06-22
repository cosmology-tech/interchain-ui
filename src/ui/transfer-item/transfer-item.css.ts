import { style, createVar } from "@vanilla-extract/css";
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
});
