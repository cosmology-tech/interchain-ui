import {
  style,
  styleVariants,
  createVar,
  keyframes,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const buttonTextColorVar = createVar();

export const container = style({
  minWidth: "340px",
  maxWidth: "460px",
  position: "relative",
});

export const smImg = style({
  width: themeVars.space[11],
  height: themeVars.space[11],
  marginRight: themeVars.space[5],
});

export const img = style({
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const flex1 = style({
  flex: 1,
  maxWidth: "215px",
});

export const onlyLg = style({
  display: "flex",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "none",
    },
  },
});

export const onlySm = style({
  display: "none",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "flex",
    },
  },
});

export const inputClass = style({
  "@media": {
    [`screen and (max-width: 700px)`]: {
      backgroundColor: themeVars.colors.smTransferInputBg,
    },
  },
});

export const imgClass = style({
  "@media": {
    [`screen and (max-width: 700px)`]: {
      backgroundColor: themeVars.colors.smTransferInputBg,
    },
  },
});

const btnTextBase = style({
  color: buttonTextColorVar,
});

export const btnText = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
      },
    }),
    btnTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
      },
    }),
    btnTextBase,
  ],
});

export const addressInput = style({
  paddingLeft: themeVars.space["15"],
  paddingRight: themeVars.space["17"],
  height: "54px",
  overflow: "hidden",
});

export const checkIcon = style({
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  position: "absolute",
  right: "0",
  bottom: "0",
  height: "54px",
});

const expandHorizontal = keyframes({
  "0%": { width: "100%", opacity: 0 },
  "100%": { width: "462px", opacity: 1 },
});
const expandHorizontalReverse = keyframes({
  "0%": { width: "462px", opacity: 1 },
  "100%": { width: "100%", opacity: 0 },
});

export const addressContainer = style({
  animation: `${expandHorizontal} .5s`,
  width: "460px",
});

export const addressContainerReverse = style({
  animation: `${expandHorizontalReverse} .5s`,
});

const expandVertical = keyframes({
  "0%": { opacity: "0" },
  "100%": { opacity: "0.8" },
});

const expandVerticalReverse = keyframes({
  "0%": { opacity: "0.8" },
  "100%": { opacity: "0" },
});

export const addressBackground = style({
  animation: `${expandVertical} .5s`,
  position: "absolute",
  width: "460px",
  height: "400px",
  top: "85px",
  right: "0",
  zIndex: "1",
  backgroundColor: themeVars.colors.transferMask,
  opacity: 0.8,
});

export const addressBackgroundReverse = style({
  animation: `${expandVerticalReverse} .5s`,
});

const smPanelFadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});
const smPanelFadeOIn = keyframes({
  "0%": { opacity: 0, },
  "30%": { opacity: 0, },
  "100%": { opacity: 1 },
});
export const smPanelHide = style({
  // animation: `${smPanelFadeOut} .5s`,
  visibility: "hidden",
});
export const smPanelShow = style({
  animation: `${smPanelFadeOIn} .5s`,
});

export const fromAddressInput = style({
  paddingRight: "20px",
  backgroundColor: themeVars.colors.inputBg,
});
