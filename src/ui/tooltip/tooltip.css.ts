import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export const tooltip = style({
  position: "relative",
  display: "inline-block",
  cursor: "help",
});

export const tooltiptext = style({
  visibility: "hidden",
  position: "absolute",
  zIndex: 1,
  opacity: 0,
  transition: "opacity 0.3s",
  minWidth: "max-content"
});

export const hovered = style({
  visibility: "visible",
  opacity: 1,
});

const placement = {
  top: style({
    bottom: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)"

  }),
  bottom: style({
    top: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)"
  }),
  left: style({
    right: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)"
  }),
  right: style({
    left: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)"
  }),
};

export const variants = recipe({
  variants: {
    placement,
  },
  defaultVariants: {
    placement: "top",
  },
});

export type Variants = RecipeVariants<typeof variants>;
