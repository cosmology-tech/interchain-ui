import {
  style,
  styleVariants,
  createVar,
  createContainer,
  keyframes,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const EXPANDED_HEIGHT_PX = `458px`;
const CONTRACTED_HEIGHT_PX = `32px`;
export const liqStakingRootContainer = createContainer();

const textButtonBgVar = createVar();
const textButtonColorVar = createVar();

export const root = style({
  containerName: liqStakingRootContainer,
});

const expandVertical = keyframes({
  "0%": { opacity: "0", height: CONTRACTED_HEIGHT_PX },
  "100%": { opacity: "1", height: EXPANDED_HEIGHT_PX },
});

const expandVerticalReverse = keyframes({
  "0%": { height: EXPANDED_HEIGHT_PX },
  "100%": { height: CONTRACTED_HEIGHT_PX },
});

export const accordionBase = style({
  position: "relative",
});

export const accordionPanel = styleVariants({
  expanded: [
    accordionBase,
    {
      height: EXPANDED_HEIGHT_PX,
      overflow: "auto",
      animation: `${expandVertical} 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
  contracted: [
    accordionBase,
    {
      height: CONTRACTED_HEIGHT_PX,
      opacity: 1,
      overflow: "hidden",
      animation: `${expandVerticalReverse} 600ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
});

const headerButtonBase = style({
  color: `${textButtonColorVar} !important`,
  backgroundColor: `${textButtonBgVar} !important`,
  selectors: {
    "&:hover": {
      opacity: 0.89,
    },
  },
});

export const headerButton = styleVariants({
  light: [
    headerButtonBase,
    style({
      vars: {
        [textButtonColorVar]: themeVars.colors.white,
        [textButtonBgVar]: themeVars.colors.textPlaceholder,
      },
    }),
  ],
  dark: [
    headerButtonBase,
    style({
      vars: {
        [textButtonColorVar]: themeVars.colors.text,
        [textButtonBgVar]: themeVars.colors.blackSecondary,
      },
    }),
  ],
});

export const numberInputBase = style({
  fontWeight: themeVars.fontWeight.semibold,
  textAlign: "right",
  height: themeVars.space["11"],
  width: "100%",
  paddingRight: "0 !important",
  paddingLeft: "0 !important",
});

export const numberInputMd = style([
  numberInputBase,
  {
    fontSize: themeVars.fontSize["xl"],
  },
]);

export const numberInputSm = style([
  numberInputBase,
  {
    fontSize: themeVars.fontSize["lg"],
  },
]);
