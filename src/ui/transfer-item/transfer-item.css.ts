import {
  style,
  styleVariants,
  createVar,
  createContainer,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const textButtonBgVar = createVar();
export const transferItemRootContainer = createContainer();

export const root = style({
  containerName: transferItemRootContainer,
  containerType: "inline-size",
});

export const img = style({
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const dropdowBtn = style({
  padding: "0",
});

const textBtnBase = style({
  color: themeVars.colors.white,
  backgroundColor: textButtonBgVar,
});

export const textBtn = styleVariants({
  light: [
    textBtnBase,
    style({
      vars: {
        [textButtonBgVar]: "#A2AEBB",
      },
    }),
  ],
  dark: [
    textBtnBase,
    style({
      vars: {
        [textButtonBgVar]: "#434B55",
      },
    }),
  ],
});

export const transferInput = style({
  fontSize: themeVars.fontSize["2xl"],
  textAlign: "right",
  width: "100%",
  paddingLeft: "0",
  paddingRight: "0",
});

export const comboboxContainer = style({
  minHeight: "86px",
  borderBottomLeftRadius: themeVars.radii.lg,
  borderBottomRightRadius: themeVars.radii.lg,
});

export const smComboboxInput = style({
  height: "auto !important",
  fontSize: "18px !important",
});
