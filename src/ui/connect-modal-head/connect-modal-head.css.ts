import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const modalHeaderTextBase = style({
  display: "block",
  textAlign: "center",
  fontSize: themeVars.fontSize.md,
  fontWeight: themeVars.fontWeight.semibold,
  width: "100%",
  height: "100%",
  margin: "0",
});

export const modalHeaderText = styleVariants({
  light: [modalHeaderTextBase, style({ color: themeVars.colors.gray700 })],
  dark: [modalHeaderTextBase, style({ color: themeVars.colors.whiteAlpha900 })],
});

export const modalHeader = style({
  fontFamily: themeVars.font.body,
  padding: themeVars.space[8],
  position: "relative",
  display: "flex",
});

export const modalBackButton = style({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  marginLeft: themeVars.space[5],
});

export const modalCloseButton = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  marginRight: themeVars.space[5],
});
