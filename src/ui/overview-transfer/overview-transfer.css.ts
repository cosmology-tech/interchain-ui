import { style, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { sprinkles } from "../../styles/sprinkles.css";

const buttonTextColorVar = createVar();

export const overviewTransfer = style({
  minWidth: "670px"
})

export const img = sprinkles({
  width: "15",
  height: "15",
})

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

