import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const buttonBgVar = createVar();
export const buttonHoverBgVar = createVar();
export const buttonTextColorVar = createVar();
export const buttonHoverTextColorVar = createVar();

export const baseButton = style({
  fontFamily: themeVars.font.body,
  fontWeight: themeVars.fontWeight.semibold,
  cursor: "pointer",
  appearance: "none",
  border: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});

export const unstyledButton = style([
  baseButton,
  {
    background: "transparent",
    color: "inherit",
  },
]);

export const variants = styleVariants({
  solid: [
    {
      borderRadius: themeVars.radii.md,
      fontWeight: themeVars.fontWeight.semibold,
    },
  ],
  outlined: [
    {
      borderRadius: themeVars.radii.md,
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: buttonTextColorVar,
      outlineOffset: "-2px",
      background: "none !important",
      color: `${buttonTextColorVar} !important`,
      selectors: {
        "&:hover": {
          opacity: 0.8,
        },
        "&:focus": {
          outline: `2px solid ${buttonTextColorVar}`,
        },
      },
    },
  ],
  link: [],
  ghost: [
    {
      borderRadius: themeVars.radii.md,
      fontWeight: themeVars.fontWeight.semibold,
      backgroundColor: "transparent !important",
      selectors: {
        "&:hover": {
          backgroundColor: `${buttonHoverBgVar} !important`,
        },
      },
    },
  ],
  unstyled: [
    style({
      backgroundColor: "transparent !important",
      color: `${themeVars.colors.text} !important`,
    }),
  ],
});

// ==== Intents
const intentPrimaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
    },
  },
});

export const intentPrimary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.primary500,
        [buttonHoverBgVar]: themeVars.colors.primary400,
      },
    }),
    intentPrimaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.primary500,
        [buttonHoverBgVar]: themeVars.colors.primary400,
      },
    }),
    intentPrimaryBase,
  ],
});

// ====
const intentSecondaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      color: buttonHoverTextColorVar,
      backgroundColor: buttonHoverBgVar,
    },
  },
});

export const intentSecondary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.gray600,
        [buttonBgVar]: themeVars.colors.gray100,
        [buttonHoverBgVar]: themeVars.colors.gray200,
        [buttonHoverTextColorVar]: themeVars.colors.gray700,
      },
    }),
    intentSecondaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.text,
        [buttonBgVar]: themeVars.colors.blackAlpha400,
        [buttonHoverBgVar]: "rgba(143,153,168, .15)",
        [buttonHoverTextColorVar]: themeVars.colors.text,
      },
    }),
    intentSecondaryBase,
  ],
});

// ====
const intentTertiaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
    },
  },
});

export const intentTertiary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.text,
      },
    }),
    intentTertiaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
        [buttonBgVar]: themeVars.colors.textSecondary,
      },
    }),
    intentTertiaryBase,
  ],
});

// ====
const intentTextBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
    },
  },
});

export const intentText = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.textSecondary,
        [buttonBgVar]: themeVars.colors.cardBg,
      },
    }),
    intentTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.textSecondary,
        [buttonBgVar]: themeVars.colors.cardBg,
      },
    }),
    intentTextBase,
  ],
});

export const disabled = style({
  cursor: "not-allowed !important",
  opacity: 0.6,
  pointerEvents: "none",
});
