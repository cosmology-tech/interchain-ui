import { style, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const tableRow = style({});

export const tableCell = style({
  selectors: {
    [`${tableRow} &:first-child`]: {
      borderTopLeftRadius: themeVars.radii.sm,
      borderBottomLeftRadius: themeVars.radii.sm,
    },
    [`${tableRow} &:last-child`]: {
      borderTopRightRadius: themeVars.radii.sm,
      borderBottomRightRadius: themeVars.radii.sm,
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

export const bottomShadow = style([
  bottomShadowBase,
  {
    vars: {
      [listBottomShadowBgVar]:
        "linear-gradient(0deg, rgba(17,17,19,1) 5%, rgba(9,9,121,0) 35%)",
    },
  },
]);
