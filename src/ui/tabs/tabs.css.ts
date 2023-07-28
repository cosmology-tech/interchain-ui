import { style, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const selectedTextColor = createVar();
export const selectedWidth = createVar();
export const selectedLeft = createVar();
export const tabsBase = style([
  {
    listStyle: "none",
    display: "flex",
    borderRadius: "50px",
    minWidth: "465px",
    zIndex: "1",
  }
]);

export const tabsHorizontal = style([
  tabsBase,
  {
    flexDirection: "row",
  },
]);
export const tabsVertical = style([
  tabsBase,
  {
    flexDirection: "column",
  },
]);

export const selected = style([
  {
    zIndex: "-1",
  },
]);

export const baseBtn = style([
  {
    all: "unset",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    borderRadius: "50px",
  },
]);

export const baseText = style({
  borderRadius: "50px",
  transition: "background-color 0.2s ease-in",
});

export const selectedText = style({
  vars: {
    [selectedTextColor]: themeVars.colors.white,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [selectedTextColor]: themeVars.colors.cardBg,
      },
    },
  },
  color: selectedTextColor,
});

export const selectedBg = style({
  zIndex: "-1",
  borderRadius: "50px",
  transition: "left 0.1s ease-out",
  width: selectedWidth,
  left: selectedLeft,
});
