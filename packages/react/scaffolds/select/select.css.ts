import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const popoverUnderlay = style({
  position: "fixed",
  inset: 0,
});

export const popoverContainer = style({
  zIndex: 10,
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgb(209 213 219)",
  overflow: "hidden",
  width: themeVars.space[28],
  marginTop: themeVars.space[4],
  borderRadius: themeVars.radii.md,
  backgroundColor: themeVars.colors.cardBg,
});

const scrollBarStyle = style({
  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    /* Track */
    "&::-webkit-scrollbar-track": {
      backgroundColor: themeVars.colors.inputBg,
    },
    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: themeVars.colors.inputBorder,
      borderRadius: "5px",
    },
    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: themeVars.colors.inputDisabledBg,
    },
  },
});

export const listboxStyle = style([
  {
    overflow: "auto",
    outline: "2px solid transparent",
    outlineOffset: "2px",
    width: "100%",
    maxHeight: "18rem",
    paddingInlineStart: 0,
    marginBlockEnd: 0,
    marginBlockStart: 0,
    margin: 0,
    padding: "1px",
  },
  scrollBarStyle,
]);

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

export const liStyle = style({
  listStyle: "none",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
});
