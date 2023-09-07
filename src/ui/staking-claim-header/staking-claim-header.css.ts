import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  minWidth: "634px",
});

export const cardContainer = style([
  {
    minHeight: themeVars.space["19"],
    flex: 1,
  },
]);
