import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

const buttonBgVar = createVar();
const buttonHoverBgVar = createVar();
const buttonTextColorVar = createVar();
const buttonHoverTextColorVar = createVar();

const outlinedBaseStyle: ComplexStyleRule = {
  borderRadius: themeVars.radii.md,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: buttonTextColorVar,
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
      color: buttonHoverTextColorVar,
      borderColor: buttonHoverTextColorVar,
    },
  },
};

const variant = {
  solid: style({
    borderRadius: themeVars.radii.md,
    fontWeight: themeVars.fontWeight.semibold,
  }),
  outlined: style(outlinedBaseStyle),
  link: style({}),
  ghost: style({
    borderRadius: themeVars.radii.md,
    fontWeight: themeVars.fontWeight.semibold,
    backgroundColor: "transparent",
    selectors: {
      "&:hover": {
        backgroundColor: buttonBgVar,
      },
    },
  }),
};

const intent = {
  primary: style({
    vars: {
      [buttonTextColorVar]: themeVars.colors.white,
      [buttonBgVar]: themeVars.colors.primary500,
      [buttonHoverBgVar]: themeVars.colors.primary400,
    },
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
    selectors: {
      "&:hover": {
        backgroundColor: buttonHoverBgVar,
      },
    },
  }),
  secondary: style({
    vars: {
      [buttonTextColorVar]: themeVars.colors.gray600,
      [buttonBgVar]: themeVars.colors.gray100,
      [buttonHoverBgVar]: themeVars.colors.gray200,
      [buttonHoverTextColorVar]: themeVars.colors.gray500,
    },
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
    selectors: {
      "&:hover": {
        color: buttonHoverTextColorVar,
        backgroundColor: buttonHoverBgVar,
      },
    },
  }),
  tertiary: style({
    vars: {
      [buttonTextColorVar]: themeVars.colors.white,
      [buttonBgVar]: themeVars.colors.text,
      [buttonHoverBgVar]: themeVars.colors.blackAlpha900,
      [buttonHoverTextColorVar]: themeVars.colors.whiteAlpha900,
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [buttonTextColorVar]: themeVars.colors.cardBg,
          [buttonHoverBgVar]: themeVars.colors.whiteAlpha900,
          [buttonHoverTextColorVar]: themeVars.colors.blackAlpha900,
        },
      },
    },
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
    selectors: {
      "&:hover": {
        color: buttonHoverTextColorVar,
        backgroundColor: buttonHoverBgVar,
      },
    },
  }),
  disabled: style({
    vars: {
      [buttonTextColorVar]: "#B4BECC",
      [buttonBgVar]: themeVars.colors.gray50,
    },
    cursor: "not-allowed",
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
  }),
};

export const size = {
  sm: s({
    fontSize: "sm",
    px: "6",
    py: "4",
  }),
  md: s({
    fontSize: "lg",
    px: "8",
    py: "6",
  }),
  lg: s({
    fontSize: "xl",
    px: "9",
    py: "9",
  }),
};

export const variants = recipe({
  base: style({
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
    height: "auto",
  }),
  variants: {
    variant,
    intent,
    size,
  },
  // Applied when multiple variants are set at once
  compoundVariants: [
    {
      variants: {
        variant: "ghost",
        intent: "secondary",
      },
      style: {
        vars: {
          [buttonBgVar]: "transparent",
        },
      },
    },
    {
      variants: {
        variant: "outlined",
        intent: "primary",
      },
      style: {
        vars: {
          [buttonBgVar]: "rgba(37, 57, 201, 0.1)",
          [buttonHoverBgVar]: "rgba(37, 57, 201, 0.1)",
          [buttonTextColorVar]: themeVars.colors.primary500,
          [buttonHoverTextColorVar]: themeVars.colors.primary400,
        },
        ...outlinedBaseStyle,
      },
    },
    {
      variants: {
        variant: "outlined",
        intent: "tertiary",
      },
      style: {
        vars: {
          [buttonBgVar]: "transparent",
          [buttonTextColorVar]: themeVars.colors.text,
        },
        ...outlinedBaseStyle,
      },
    },
    {
      variants: {
        variant: "outlined",
        intent: "tertiary",
      },
      style: {
        vars: {
          [buttonBgVar]: "transparent",
          [buttonTextColorVar]: themeVars.colors.text,
        },

    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [buttonTextColorVar]: themeVars.colors.text,
        },
      },
    },
        ...outlinedBaseStyle,
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    intent: "primary",
    size: "md",
  },
});

export type Variants = RecipeVariants<typeof variants>;
