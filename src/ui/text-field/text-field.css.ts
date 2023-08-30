import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { baseTextStyles } from "../text/text.css";
import { unstyledButton } from "../button/button.css";
import { themeVars } from "../../styles/themes.css";

export const inputBorderVar = createVar();
export const inputBgVar = createVar();
export const inputTextVar = createVar();

export const rootInput = style({
  position: "relative",
  display: "flex",
  color: inputTextVar,
  vars: {
    [inputBorderVar]: themeVars.colors.inputBorder,
    [inputBgVar]: themeVars.colors.inputBg,
    [inputTextVar]: themeVars.colors.text,
  },
  selectors: {
    "&:hover": {
      vars: {
        [inputBorderVar]: themeVars.colors.text,
      },
    },
  },
});

export const rootInputFocused = style({
  vars: {
    [inputBorderVar]: themeVars.colors.text,
  },
});

const baseInputStyles = style([
  baseTextStyles,
  style({
    flex: "1",
    outline: "none",
    position: "relative",
    appearance: "none",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "6px",
    borderColor: inputBorderVar,
    backgroundColor: inputBgVar,
    color: "inherit",
    selectors: {
      "&:hover": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
      },
      "&:focus": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
        boxShadow: `
         ${themeVars.colors.inputBg} 0px 0px 0px 2px,
         ${themeVars.colors.text} 0px 0px 0px 4px,
         rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`,
      },
      "&::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
    },
  }),
]);

export const inputStyles = styleVariants({
  light: [baseInputStyles],
  dark: [
    baseInputStyles,
    style({
      vars: {
        [inputTextVar]: themeVars.colors.textSecondary,
      },
    }),
  ],
});

export const inputRootIntent = styleVariants({
  default: [],
  error: [
    style({
      vars: {
        [inputBorderVar]: themeVars.colors.inputDangerBorder,
        [inputBgVar]: themeVars.colors.inputDangerBg,
      },
    }),
  ],
  disabled: [
    style({
      vars: {
        [inputBorderVar]: "none",
        [inputBgVar]: themeVars.colors.inputDisabledBg,
      },
    }),
  ],
});

export const inputIntent = styleVariants({
  default: [],
  error: [],
  disabled: [
    style({
      color: themeVars.colors.inputDisabledText,
      borderColor: inputBgVar,
    }),
  ],
});

export const inputSizes = styleVariants({
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
      paddingLeft: themeVars.space[10],
      paddingRight: themeVars.space[10],
      paddingTop: themeVars.space[8],
      paddingBottom: themeVars.space[8],
    }),
  ],
});

export const clearIcon = style({
  color: "inherit",
  fontSize: themeVars.fontSize.lg,
});

export const clearButton = style([
  unstyledButton,
  style({
    padding: 0,
  }),
]);
