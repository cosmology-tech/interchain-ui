import { keyframes, style, createVar } from "@vanilla-extract/css";

const animationBaseStr = `200ms ease-out 0s 1 normal both running`;

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

const animateBg = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});
const animateBgReverse= keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const activeBg = style({
  animation: `${animationBaseStr} ${animateBg}`,
});
export const reverseBg = style({
  animation: `${animationBaseStr} ${animateBgReverse}`,
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
  userSelect: "none",
});

const scaleContent = keyframes({
  "0%": { opacity: 0, transform: "scale(0.97)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});
const scaleContentReverse = keyframes({
  "0%": { opacity: 1, transform: "scale(1)" },
  "100%": { opacity: 0, transform: "scale(0.97)" },
});
export const activeContent = style({
  animation: `${animationBaseStr} ${scaleContent}`,
});
export const reverseContent = style({
  animation: `${animationBaseStr} ${scaleContentReverse}`,
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
