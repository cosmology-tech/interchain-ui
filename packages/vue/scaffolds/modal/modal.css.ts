import { style, keyframes } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "scale(0.95)" },
  to: { transform: "scale(1)" },
});

const scaleOut = keyframes({
  from: { transform: "scale(1)" },
  to: { transform: "scale(0.95)" },
});

export const modalRoot = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
});

export const modalContainer = style({
  position: "fixed",
  inset: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const modalBackdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

// New styles for backdrop transition
export const backdropTransitionEnter = style({
  transitionProperty: "opacity",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const backdropTransitionEnterFrom = style({
  opacity: "0",
});

export const backdropTransitionEnterTo = style({
  opacity: "1",
});

export const backdropTransitionLeave = style({
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const backdropTransitionLeaveFrom = style({
  opacity: "1",
});

export const backdropTransitionLeaveTo = style({
  opacity: "0",
});

export const modalWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const modalPanel = style({
  position: "relative",
  backgroundColor: "white",
  borderRadius: "0.5rem",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  overflow: "hidden",
  maxWidth: "28rem",
  width: "100%",
});

export const modalContent = style({
  padding: "1.5rem",
});

export const modalHeader = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

export const modalCloseButton = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  padding: "0.5rem",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1.5rem",
  lineHeight: 1,
});

export const modalBody = style({
  marginTop: "1rem",
});

export const transitionEnter = style({
  transitionProperty: "opacity, transform",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const transitionEnterFrom = style({
  opacity: "0",
  transform: "scale(0.95)",
});

export const transitionEnterTo = style({
  opacity: "1",
  transform: "scale(1)",
});

export const transitionLeave = style({
  transitionProperty: "opacity, transform",
  transitionDuration: "200ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const transitionLeaveFrom = style({
  opacity: "1",
  transform: "scale(1)",
});

export const transitionLeaveTo = style({
  opacity: "0",
  transform: "scale(0.95)",
});

globalStyle(
  `${modalContainer} *, ${modalContainer} *::before, ${modalContainer} *::after`,
  {
    boxSizing: "border-box",
  },
);
