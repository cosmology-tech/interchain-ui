import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export const container = style({
  padding: "0 !important",
});

export const round = {
  true: style({
    borderRadius: "50%",
  }),
};

export const variants = recipe({
  variants: {
    round,
  },
});

export type Variants = RecipeVariants<typeof variants>;
