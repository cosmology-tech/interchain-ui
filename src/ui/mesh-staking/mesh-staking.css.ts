import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const tableRow = style({
  selectors: {
    "&:hover": {
      backgroundColor: "rgba(218, 213, 227, 0.1)",
    },
  },
});

export const tableCell = style({
  height: themeVars.space["14"],
  selectors: {
    [`${tableRow} &:first-child`]: {
      borderTopLeftRadius: themeVars.radii["base"],
      borderBottomLeftRadius: themeVars.radii["base"],
    },
    [`${tableRow} &:last-child`]: {
      borderTopRightRadius: themeVars.radii["base"],
      borderBottomRightRadius: themeVars.radii["base"],
    },
  },
});

export const tableBody = style({
  selectors: {
    "&:before": {
      content: '""',
      display: "block",
      height: themeVars.space["9"],
    },
    "&:after": {
      content: '""',
      display: "block",
      height: themeVars.space["9"],
    },
  },
});
export const borderedTableCell = style({
  position: "relative",
  height: "calc(40px + 1px)",
  selectors: {
    "&:after": {
      content: "",
      position: "absolute",
      bottom: "-1px",
      left: 0,
      right: 0,
      width: "100%",
      height: "1px",
      backgroundColor: themeVars.colors.divider,
    },
  },
});

export const firstRowCell = style({
  paddingTop: themeVars.space["4"],
});

export const lastRowCell = style({
  paddingBottom: themeVars.space["9"],
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

export const scrollBar = style([
  scrollBarBase,
  {
    vars: {
      [scrollBarThumbBgVar]: themeVars.colors.inputBorder,
    },
  },
]);

const listBottomShadowBgVar = createVar();

const bottomShadowBase = style({
  height: "36px",
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  background: listBottomShadowBgVar,
  zIndex: 10,
});

export const bottomShadow = styleVariants({
  light: [
    bottomShadowBase,
    {
      vars: {
        [listBottomShadowBgVar]:
          "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)",
      },
    },
  ],
  dark: [
    bottomShadowBase,
    {
      vars: {
        [listBottomShadowBgVar]:
          "linear-gradient(0deg, rgba(17,17,19,1) 5%, rgba(9,9,121,0) 35%)",
      },
    },
  ],
});
