import { style, keyframes, createContainer } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const timelineContainer = createContainer();

export const timeline = style({
  containerType: "size",
  containerName: timelineContainer,
});

export const eventItem = style({
  width: "50%",
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      width: "100%",
    },
  },
});

export const eventContent = style({
  position: "relative",
  selectors: {
    "&:after": {
      content: `""`,
      position: "absolute",
      borderRadius: "2px",
      backgroundColor: themeVars.colors.cardBg,
      transform: "rotate(45deg)",
      width: themeVars.space["8"],
      height: themeVars.space["8"],
      top: themeVars.space["8"],
      zIndex: 1,
    },
  },
});

export const eventContentLeft = style({
  marginLeft: themeVars.space["11"],
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      marginLeft: themeVars.space["11"],
      marginRight: 0,
    },
  },
});

export const eventContentRight = style({
  marginRight: themeVars.space["11"],
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      marginLeft: themeVars.space["11"],
      marginRight: 0,
    },
  },
});

export const eventContentArrowLeft = style({
  selectors: {
    "&:after": {
      left: "-9px",
      borderTopLeftRadius: "0px",
      borderBottomRightRadius: "0px",
      borderRight: "none",
      borderTop: "none",
      borderLeft: `1px solid ${themeVars.colors.divider}`,
      borderBottom: `1px solid ${themeVars.colors.divider}`,
    },
  },
});

export const eventContentArrowRight = style({
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      selectors: {
        // Collapse the arrow on mobile
        "&:after": {
          left: "-9px",
          borderTopLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          borderRight: "none",
          borderTop: "none",
          borderLeft: `1px solid ${themeVars.colors.divider}`,
          borderBottom: `1px solid ${themeVars.colors.divider}`,
        },
      },
    },
  },
  selectors: {
    "&:after": {
      right: "-9px",
      borderTopLeftRadius: "0px",
      borderBottomRightRadius: "0px",
      borderRight: `1px solid ${themeVars.colors.divider}`,
      borderTop: `1px solid ${themeVars.colors.divider}`,
      borderLeft: "none",
      borderBottom: "none",
    },
  },
});

const pulse = keyframes({
  "0%": {
    transform: `scale(0.95)`,
    boxShadow: `0 0 0 0 rgba(91, 36, 158, 0.7)`,
  },
  "70%": {
    transform: `scale(1)`,
    boxShadow: `0 0 0 10px rgba(91, 36, 158, 0)`,
  },
  "100%": {
    transform: `scale(0.95)`,
    boxShadow: `0 0 0 0 rgba(91, 36, 158, 0)`,
  },
});

export const eventCircle = style({
  position: "absolute",
  backgroundColor: themeVars.colors.purple100,
  borderRadius: "50%",
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 1)",
  height: themeVars.space["9"],
  width: themeVars.space["9"],
  transform: "scale(1)",
  animation: `${pulse} 2s infinite`,
  top: themeVars.space["7"],
  zIndex: 2,
  selectors: {
    '&[data-direction="left"]': {
      left: `-39px`,
    },
    '&[data-direction="right"]': {
      right: `-39px`,
    },
  },
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      selectors: {
        '&[data-direction="right"]': {
          left: `-39px`,
        },
      },
    },
  },
});

export const eventBar = style({
  position: "absolute",
  backgroundColor: themeVars.colors.purple100,
  borderRadius: themeVars.radii.md,
  height: "calc(100% + 16px)",
  width: themeVars.space["2"],
  top: themeVars.space["8"],
  zIndex: 0,
  selectors: {
    '&[data-direction="left"]': {
      left: `calc(-39px + 8px)`,
    },
    '&[data-direction="right"]': {
      right: `calc(-39px + 8px)`,
    },
    '&[data-is-last="true"]': {
      height: "0px",
    },
  },
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      selectors: {
        '&[data-direction="right"]': {
          left: `calc(-39px + 8px)`,
        },
      },
    },
  },
});
