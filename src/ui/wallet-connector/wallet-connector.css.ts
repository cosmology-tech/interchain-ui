import {
  style,
  styleVariants,
  createVar,
  keyframes,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const walletConnectorShadowColorVar = createVar();
export const walletConnectorPrimaryColorVar = createVar();
export const walletConnectorWarningColorVar = createVar();
export const walletConnectorDangerColorVar = createVar();

// ==== Wallet connector frame
const walletConnectorFrameBase = style({
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  gap: themeVars.space[8],
  width: "fit-content",
  boxShadow: `0px 4.5px 20px 0px ${walletConnectorShadowColorVar}`,
  padding: themeVars.space[9],
  borderRadius: themeVars.radii["4xl"],
});

export const walletConnectorFrame = styleVariants({
  light: [
    {
      vars: {
        [walletConnectorShadowColorVar]: themeVars.palettes.neutral200,
        [walletConnectorPrimaryColorVar]: themeVars.colors.primary,
        [walletConnectorDangerColorVar]: themeVars.colors.textDanger,
        [walletConnectorWarningColorVar]: themeVars.colors.textWarning,
      },
    },
    walletConnectorFrameBase,
  ],
  dark: [
    {
      vars: {
        [walletConnectorShadowColorVar]: themeVars.palettes.neutral900,
        [walletConnectorPrimaryColorVar]: themeVars.palettes.primary500,
        [walletConnectorDangerColorVar]: themeVars.colors.textDanger,
        [walletConnectorWarningColorVar]: themeVars.colors.textWarning,
      },
    },
    walletConnectorFrameBase,
  ],
});

// ==== Wallet connector head
export const walletConnectorHeadAction = style({
  padding: "0 !important",
  width: "20px !important",
  height: "20px !important",
  minWidth: "unset !important",
});

// ==== Wallet connector info
export const walletConnectorInfoImg = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginInlineStart: "auto",
  marginInlineEnd: "auto",
  borderRadius: themeVars.radii.sm,
});

export const walletConnectorInfo = styleVariants({
  light: {
    vars: {
      [walletConnectorShadowColorVar]: themeVars.palettes.neutral200,
    },
    display: "inline-flex",
    justifyContent: "center",
    alignContent: "center",
    boxShadow: `0px 0px 10px 0px ${walletConnectorShadowColorVar}`,
  },
  dark: {
    vars: {
      [walletConnectorShadowColorVar]: themeVars.palettes.neutral900,
    },
    display: "inline-flex",
    justifyContent: "center",
    alignContent: "center",
    boxShadow: `0px 0px 10px 0px ${walletConnectorShadowColorVar}`,
  },
});

// ==== Wallet connector status
const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const statusConnectingSpinner = style({
  position: "relative",
  width: "108px",
  height: "108px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const statusConnectingSpinnerIcon = style({
  width: "40px",
  height: "40px",
  zIndex: 1,
});

export const statusConnectingSpinnerBorder = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  animation: `${rotate} 2s linear infinite`,
});

export const statusConnectingSpinnerCircle = style({
  stroke: walletConnectorPrimaryColorVar,
  strokeDasharray: "40 300",
  strokeLinecap: "round",
});

// ==== Wallet connector status ring
const ringActionColorVar = createVar();

export const walletConnectorStatusRing = style({
  position: "relative",
  width: "108px",
  height: "108px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: walletConnectorPrimaryColorVar,
  zIndex: 0,
  vars: {
    [ringActionColorVar]: walletConnectorPrimaryColorVar,
  },
  selectors: {
    '&[data-status="Rejected"]': {
      vars: {
        [ringActionColorVar]: walletConnectorDangerColorVar,
      },
      borderColor: walletConnectorDangerColorVar,
    },
    '&[data-status="Error"]': {
      vars: {
        [ringActionColorVar]: walletConnectorDangerColorVar,
      },
      borderColor: walletConnectorDangerColorVar,
    },
    '&[data-status="Disconnected"]': {
      vars: {
        [ringActionColorVar]: walletConnectorWarningColorVar,
      },
      borderColor: walletConnectorWarningColorVar,
    },
  },
});

export const walletConnectorStatusRingImg = style({
  width: "60px",
  height: "60px",
});

export const walletConnectorStatusRingActionPseudo = style({
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: themeVars.colors.cardBg,
  zIndex: 1,
});

export const walletConnectorStatusRingAction = style({
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: ringActionColorVar,
  backgroundColor: `rgb(from ${ringActionColorVar} r g b / 10%)`,
  color: ringActionColorVar,
  zIndex: 2,
});
