import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  sprinkles as s,
  RequiredResponsiveObject,
} from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { breakpoints } from "~/styles/tokens";

// export const container = style([
//   s({
//     marginLeft: "9",
//   }),
//   {
//     minWidth: "400px",
//     marginTop: "27px",
//     flexWrap: "nowrap",
// "@media": {
//   [`screen and (max-width: ${breakpoints.tablet}px)`]: {
//     flexWrap: "wrap",
//   },
// },
//   },
// ]);

export const container = style([
  s({
    paddingTop: "10",
    // paddingLeft: "10",
  }),
  {
    width: "752px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "400px",
      },
    },
  },
]);

export const titleContainer = style([
  s({
    marginTop: "9",
    marginBottom: "9",
  }),
  {
    paddingLeft: "88px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        display: "none !important",
      },
    },
  },
]);

export const title = style([
  s({
    width: "1/5",
  }),
]);

export const listContainer = s({
  paddingTop: "6",
  paddingBottom: "6",
});
