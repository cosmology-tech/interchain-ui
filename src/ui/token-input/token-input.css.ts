import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";

export const progressContainer = style({
  marginRight: themeVars.space[10],
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "100%",
      justifyContent: "space-between",
      marginBottom: themeVars.space[7],
      marginRight: 0,
    },
  },
});

export const iconBox = style([
  {
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {},
    },
  },
]);

export const denom = style({
  fontSize: themeVars.fontSize.xs,
});

export const smSpace = style({
  width: "24px",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "0",
    },
  },
});

export const icon = style({
  width: themeVars.space[13],
  height: themeVars.space[13],
  borderRadius: themeVars.radii.base,
  backgroundColor: themeVars.colors.cardBg,
  marginLeft: themeVars.space[9],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const inputBox = style({
  borderColor: themeVars.colors.inputBorder,
  borderRadius: themeVars.radii.md,
  backgroundColor: themeVars.colors.cardBg,
  position: "relative",
  borderWidth: "1px",
  borderStyle: "solid",
  height: "68px",
  flex: 1,
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "100%",
    },
  },
});

export const imgBox = style({
  width: themeVars.space[18],
  height: "100%",
  borderColor: themeVars.colors.inputBorder,
  borderRightWidth: "1px",
  borderRightStyle: "solid",
});

export const img = style({
  width: themeVars.space[14],
  height: themeVars.space[14],
});

export const token = style({
  width: "100%",
  backgroundColor: themeVars.colors.cardBg,
  borderRadius: themeVars.radii.lg,
  border: 0,
  outline: 0,
});

export const caulator = style({
  position: "absolute",
  height: "100%",
  right: themeVars.space[9],
});

export const disabled = style({
  opacity: 0.6,
  cursor: "not-allowed",
});

export const inputTitle = style({
  flex: 1,
});
