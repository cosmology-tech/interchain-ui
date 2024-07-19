import { style, styleVariants } from "@vanilla-extract/css";
import {
  inputBgVar,
  inputBorderColorVar,
  inputBorderRadiusVar,
  inputBorderWidthVar,
  zIndexConfig,
  input,
  borderFocusedLight,
  borderFocusedDark,
} from "../text-field/text-field.css";
import { themeVars } from "../../styles/themes.css";

export const textFieldAddon = style({
  display: "flex",
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  position: "absolute",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  background: inputBgVar,
  zIndex: zIndexConfig.inputAddon,
  selectors: {
    [`${input}[data-intent='none'][data-theme='light']:focus-within ~ &`]:
      borderFocusedLight,
    [`${input}[data-intent='none'][data-theme='dark']:focus-within ~ &`]:
      borderFocusedDark,
  },
});

export const textFieldAddonPositions = styleVariants({
  end: [
    style({
      right: 0,
      top: 0,
      bottom: 0,
      borderTopRightRadius: inputBorderRadiusVar,
      borderBottomRightRadius: inputBorderRadiusVar,
    }),
  ],
  start: [
    style({
      left: 0,
      top: 0,
      bottom: 0,
      borderTopLeftRadius: inputBorderRadiusVar,
      borderBottomLeftRadius: inputBorderRadiusVar,
    }),
  ],
});

export const textFieldAddonSizes = styleVariants({
  sm: [
    style({
      paddingLeft: themeVars.space[6],
      paddingRight: themeVars.space[6],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
    }),
  ],
  md: [
    style({
      paddingLeft: themeVars.space[8],
      paddingRight: themeVars.space[8],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
    }),
  ],
});

export const textFieldAddonDivider = styleVariants({
  end: [
    style({
      borderLeftWidth: inputBorderWidthVar,
      borderLeftStyle: "solid",
      borderLeftColor: inputBorderColorVar,
    }),
  ],
  start: [
    style({
      borderRightWidth: inputBorderWidthVar,
      borderRightStyle: "solid",
      borderRightColor: inputBorderColorVar,
    }),
  ],
});
