import { style, styleVariants } from "@vanilla-extract/css";

export const modalContainer = style({
  position: `fixed`,
  top: 0,
  left: 0,
  zIndex: 999,
  width: `100%`,
  height: `100%`,
  overflow: `hidden`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  transition: `opacity 300ms ease-in-out`,
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

const modalBackdropBase = style({
  position: `absolute`,
  top: 0,
  left: 0,
  width: `100%`,
  height: `100%`,
});

export const modalBackdrop = styleVariants({
  light: [
    modalBackdropBase,
    {
      backgroundColor: `rgba(0, 0, 0, 0.48)`, // blackAlpha600
    },
  ],
  dark: [
    modalBackdropBase,
    {
      backgroundColor: `rgba(0, 0, 0, 0.48)`, // blackAlpha600
    },
  ],
});

export const modalContent = style({
  position: `relative`,
  zIndex: 1,
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
