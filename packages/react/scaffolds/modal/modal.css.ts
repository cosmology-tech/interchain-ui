import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/themes.css";

export const modalContainer = style({
  position: `fixed`,
  top: 0,
  left: 0,
  zIndex: themeVars.zIndex[50],
  width: `100%`,
  height: `100%`,
  overflow: `hidden`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  transition: `opacity 300ms ease-in-out`,
  padding: themeVars.space[8], // top and bottom gutters
  selectors: {
    '&[data-modal-open="true"]': {
      opacity: 1,
      visibility: `visible`,
    },
    '&[data-modal-open="false"]': {
      opacity: 0,
      visibility: `hidden`,
    },
  },
});

export const modalBackdrop = style({
  position: `fixed`,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: `rgba(17, 20, 24, .7)`,
});

export const modalContent = style({
  position: `relative`,
  zIndex: 1,
  overflow: "hidden",
});

export const modalHeader = style({
  position: "relative",
  display: "flex",
});

export const modalCloseButton = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
});

globalStyle(
  `${modalContainer} *, ${modalContainer} *::before, ${modalContainer} *::after`,
  {
    boxSizing: `border-box`,
  },
);
