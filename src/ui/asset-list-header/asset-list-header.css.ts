import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const assetListHeader = style({
  minWidth: "720px",
  boxSizing: "border-box",
});

export const crossContainer = style([
  {
    minHeight: "103px",
  },
]);

export const card = style({
  padding: themeVars.space[10],
  backgroundColor: themeVars.colors.cardBg,
  width: "calc(100% / 3)",
  borderRadius: themeVars.radii.lg,
});

export const crossBtn = style({
  width: "calc(100% / 3)",
});

export const singleContainer = style({
  boxSizing: "border-box",
  width: "100%",
  minHeight: themeVars.space[21],
  padding: themeVars.space[10],
  backgroundColor: themeVars.colors.cardBg,
  borderRadius: themeVars.radii.lg,
});
