import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const lgImg = style({
  width: themeVars.space[14],
  height: themeVars.space[14],
});

export const smImg = style({
  width: themeVars.space[10],
  height: themeVars.space[10],
});

export const fieldContainer = style({
  width: "25%",
});
