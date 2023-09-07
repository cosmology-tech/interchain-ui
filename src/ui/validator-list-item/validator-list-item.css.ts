import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  minWidth: "600px",
});

export const img = style([
  {
    width: themeVars.space["14"],
    height: themeVars.space["14"],
    marginRight: themeVars.space["10"],
    borderRadius: "50%",
  },
]);

export const itemContainer = style({
  flex: 1,
});
