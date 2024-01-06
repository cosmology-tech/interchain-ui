import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "@/styles/themes.css";
import { listboxStyleNoShadow } from "../select/select.css";

const spacingMd = style({
  paddingTop: themeVars.space[9],
  paddingBottom: themeVars.space[9],
  paddingLeft: themeVars.space[9],
  paddingRight: themeVars.space[5],
  maxHeight: "304px",
  boxSizing: "border-box",
  zIndex: themeVars.zIndex[100],
  selectors: {
    "& + &": {
      marginTop: themeVars.space[2],
    },
  },
});

const spacingSm = style({
  paddingTop: themeVars.space[6],
  paddingBottom: themeVars.space[6],
  paddingLeft: themeVars.space[4],
  paddingRight: themeVars.space[4],
  maxHeight: "304px",
  boxSizing: "border-box",
  zIndex: themeVars.zIndex[100],
  selectors: {
    "& + &": {
      marginTop: themeVars.space[2],
    },
  },
});

export const chainSwapListBox = styleVariants({
  light: [listboxStyleNoShadow.light, spacingMd],
  dark: [listboxStyleNoShadow.dark, spacingMd],
});

export const chainSwapListBoxSm = styleVariants({
  light: [listboxStyleNoShadow.light, spacingSm],
  dark: [listboxStyleNoShadow.dark, spacingSm],
});
