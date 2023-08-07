import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { scrollBar } from "../shared/shared.css";

const listBoxBase = style({
  overflow: "auto",
  outline: "2px solid transparent",
  outlineOffset: "2px",
  width: "100%",
  maxHeight: "304px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  borderRadius: themeVars.radii.md,
  backgroundColor: themeVars.colors.menuItemBg,
});

const listBoxBaseWithShadow = style([
  listBoxBase,
  {
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
]);

export const listboxStyle = styleVariants({
  light: [
    listBoxBaseWithShadow,
    scrollBar.light,
    style({
      borderColor: "#D1D6DD",
    }),
  ],
  dark: [
    listBoxBaseWithShadow,
    scrollBar.dark,
    style({
      borderColor: "#434B55",
    }),
  ],
});

export const listboxStyleNoShadow = styleVariants({
  light: [listBoxBase, scrollBar.light],
  dark: [listBoxBase, scrollBar.dark],
});

export const selectRoot = style([
  {
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    width: "100%",
  },
]);

export const selectButton = style({
  position: "relative",
});