import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  minWidth: "634px",
});

export const cardContainer = style({
  marginBottom: themeVars.space["12"],
  marginTop: themeVars.space["13"],
});

export const img = style({
  width: themeVars.space["16"],
  height: themeVars.space["16"],
  marginRight: themeVars.space["8"],
});
