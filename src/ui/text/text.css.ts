import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

const variant = {
  body: style({
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    lineHeight: themeVars.lineHeight.normal,
  }),
  heading: style({
    fontSize: themeVars.fontSize.md,
    fontWeight: themeVars.fontWeight.semibold,
    lineHeight: themeVars.lineHeight.tall,
  }),
};

export const variants = recipe({
  base: style({
    fontFamily: themeVars.font.body,
    color: themeVars.colors.gray700,
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
});

export type Variants = RecipeVariants<typeof variants>;

// export type Variants = {
//   variant?: "body" | "heading";
//   ellipsis?: boolean | undefined;
//   underline?: boolean | undefined;
// };
