import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { listboxStyleNoShadow } from "../select/select.css";

const spacings = style({
  paddingTop: themeVars.space[9],
  paddingBottom: themeVars.space[9],
  paddingLeft: themeVars.space[9],
  paddingRight: themeVars.space[9],
  maxHeight: "304px",
  selectors: {
    "& + &": {
      marginTop: themeVars.space[2],
    },
  },
});

export const chainSwapListBox = styleVariants({
  light: [listboxStyleNoShadow.light, spacings],
  dark: [listboxStyleNoShadow.dark, spacings],
});
