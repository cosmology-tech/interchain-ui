import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const listBottomShadowBgVar = createVar();

const bottomShadowBase = style({
  height: "36px",
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  background: listBottomShadowBgVar,
});

export const bottomShadow = styleVariants({
  light: [
    style({
      vars: {
        [listBottomShadowBgVar]:
          "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)",
      },
    }),
    bottomShadowBase,
  ],
  dark: [
    style({
      vars: {
        [listBottomShadowBgVar]:
          "linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)",
      },
    }),
    bottomShadowBase,
  ],
});

export const fullWidthHeight = style({
  width: "100%",
  height: "100%",
});

export const scrollBarThumbBgVar = createVar();

const scrollBarBase = style({
  // Firefox
  scrollbarWidth: "thin" /* "auto" or "thin" */,
  scrollbarColor: `${scrollBarThumbBgVar} transparent` /* scroll thumb and track */,
  selectors: {
    "&::-webkit-scrollbar": {
      width: themeVars.space[3],
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: scrollBarThumbBgVar,
      borderRadius: themeVars.space[2],
    },
  },
});

export const scrollBar = styleVariants({
  light: [
    style({
      vars: {
        [scrollBarThumbBgVar]: "#A2AEBB",
      },
    }),
    scrollBarBase,
  ],
  dark: [
    style({
      vars: {
        [scrollBarThumbBgVar]: "#697584",
      },
    }),
    scrollBarBase,
  ],
});
