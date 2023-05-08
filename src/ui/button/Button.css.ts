import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

const variant = {
  solid: style({
    borderRadius: themeVars.radii.md,
    fontWeight: themeVars.fontWeight.semibold,
  }),
  outlined: style({}),
  link: style({}),
  ghost: style({}),
};

const intent = {
  primary: style({
    backgroundColor: themeVars.colors.primary500,
    color: themeVars.colors.white,
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.colors.primary400,
      },
    },
  }),
  secondary: style({
    backgroundColor: themeVars.colors.gray100,
    color: themeVars.colors.body,
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.colors.gray300,
      },
    },
  }),
  disabled: style({
    cursor: "not-allowed",
    color: "#B4BECC",
    backgroundColor: themeVars.colors.gray50,
  }),
};

const size = {
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
  defaultVariants: {
    variant: "solid",
    intent: "primary",
    size: "md",
  },
});

export type Variants = RecipeVariants<typeof variants>;
