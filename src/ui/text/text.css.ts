import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { sprinkles } from "../../styles/sprinkles.css";

const variant = {
  body: sprinkles({
    fontSize: "sm",
    fontWeight: "normal",
    lineHeight: "normal",
  }),
  heading: style({
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "tall",
  }),
};

export const variants = recipe({
  base: style({
    fontFamily: themeVars.font.body,
  }),
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

// export type Variants = {
//   variant?: "body" | "heading";
//   ellipsis?: boolean | undefined;
//   underline?: boolean | undefined;
// };
