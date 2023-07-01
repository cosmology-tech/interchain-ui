import { style, keyframes, createVar } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const logoFrameColorDisconnectedVar = createVar();
const logoFrameColorConnectingVar = createVar();
const logoFrameColorNotExistVar = createVar();

export const modalStatusContainer = style([
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  s({
    px: "8",
    py: "12",
    backgroundColor: {
      light: "white",
      dark: "gray700",
    },
  }),
]);

export const statusLogo = style([
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
  },
  s({
    width: "19",
    height: "19",
  }),
]);

export const disconnectedLogoFrame = style({
  vars: {
    [logoFrameColorDisconnectedVar]: themeVars.colors.orange300,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [logoFrameColorDisconnectedVar]: themeVars.colors.orange400,
      },
    },
  },
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorDisconnectedVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const statusLogoImage = s({
  px: "7",
  py: "7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const statusLogoImageSvg = s({
  width: "19",
  height: "19",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const rotateAnim = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const connectingLogoFrame = style({
  vars: {
    [logoFrameColorConnectingVar]: themeVars.colors.purple300,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [logoFrameColorConnectingVar]: themeVars.colors.purple400,
      },
    },
  },
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderLeftColor: logoFrameColorConnectingVar,
  borderRightColor: logoFrameColorConnectingVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
  animationName: rotateAnim,
  animationDuration: "3s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
});

export const notExistLogoFrame = style({
  vars: {
    [logoFrameColorNotExistVar]: themeVars.colors.red300,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [logoFrameColorNotExistVar]: themeVars.colors.red400,
      },
    },
  },
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorNotExistVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const errorDescription = style([
  {
    lineHeight: 1.3,
    opacity: 0.7,
    whiteSpace: "pre-line",
    overflowY: "scroll",
    paddingInlineStart: themeVars.space[8],
    paddingInlineEnd: themeVars.space[8],
    scrollbarWidth: "none",
    selectors: {
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  },
  s({
    paddingTop: "2",
    paddingBottom: "2",
    marginBottom: "8",
    fontSize: "sm",
    maxHeight: "22",
  }),
]);
