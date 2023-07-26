import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

const buttonBgVar = createVar();
const buttonHoverBgVar = createVar();
const buttonTextColorVar = createVar();
const buttonHoverTextColorVar = createVar();

const outlinedBaseStyle: ComplexStyleRule = {
  borderRadius: themeVars.radii.md,
  outlineWidth: "2px",
  outlineStyle: "solid",
  outlineColor: buttonTextColorVar,
  outlineOffset: "-2px",
  backgroundColor: buttonBgVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
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
  unstyled: style({}),
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
        opacity: 0.8,
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
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [buttonTextColorVar]: themeVars.colors.cardBg,
        },
      },
    },
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
    selectors: {
      "&:hover": {
        opacity: 0.8,
      },
    },
  }),
  text: style({
    vars: {
      [buttonTextColorVar]: themeVars.colors.textSecondary,
      [buttonBgVar]: themeVars.colors.cardBg,
    },
    color: buttonTextColorVar,
    backgroundColor: buttonBgVar,
    selectors: {
      "&:hover": {
        opacity: 0.8,
      },
    },
  }),
};

export const disabled = {
  true: style({
    cursor: "not-allowed !important",
    opacity: 0.6,
    pointerEvents: "none",
  }),
};

export const size = {
  xs: style({
    fontSize: themeVars.fontSize.xs,
    paddingRight: themeVars.space[4],
    paddingLeft: themeVars.space[4],
    height: themeVars.space[10],
    minWidth: themeVars.space[10],
  }),
  sm: style({
    fontSize: themeVars.fontSize.sm,
    paddingRight: themeVars.space[6],
    paddingLeft: themeVars.space[6],
    height: themeVars.space[12],
    minWidth: themeVars.space[12],
  }),
  md: style({
    fontSize: themeVars.fontSize.md,
    paddingRight: themeVars.space[8],
    paddingLeft: themeVars.space[8],
    height: themeVars.space[14],
    minWidth: themeVars.space[14],
  }),
  lg: style({
    fontSize: themeVars.fontSize.lg,
    paddingRight: themeVars.space[10],
    paddingLeft: themeVars.space[10],
    height: themeVars.space[15],
    minWidth: themeVars.space[15],
  }),
};

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
});

export const unstyledButton = style([
  baseButton,
  {
    background: "transparent",
    color: "inherit",
  },
]);

export const variants = recipe({
  base: baseButton,
  variants: {
    variant,
    intent,
    disabled,
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
        selectors: {
          "&:hover": {
            opacity: 0.8,
          },
        },
      },
    },
    {
      variants: {
        variant: "unstyled",
        intent: "primary",
      },
      style: {
        vars: {
          [buttonTextColorVar]: themeVars.colors.text,
        },
        backgroundColor: "transparent",
        color: buttonTextColorVar,
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
