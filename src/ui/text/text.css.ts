import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { sprinkles as s } from "../../styles/sprinkles.css";

const variant = {
  body: s({
    fontSize: "sm",
    fontWeight: "normal",
    lineHeight: "normal",
  }),
  heading: s({
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "tall",
  }),
};

export const baseTextStyles = s({
  fontFamily: "body",
});

export const textTransformStyle = styleVariants({
  ellipsis: [
    baseTextStyles,
    style({
      textOverflow: `ellipsis`,
      overflow: `hidden`,
      whiteSpace: `nowrap`,
    }),
  ],
  underline: [
    baseTextStyles,
    style({
      textDecoration: `underline`,
    }),
  ],
});

export const variants = recipe({
  base: baseTextStyles,
  variants: {
    variant,
    ellipsis: {
      true: style({
        textOverflow: `ellipsis`,
        overflow: `hidden`,
        whiteSpace: `nowrap`,
      }),
    },
    underline: {
      true: style({
        textDecoration: `underline`,
      }),
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type Variants = RecipeVariants<typeof variants>;
