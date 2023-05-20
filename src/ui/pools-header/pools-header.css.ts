import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  sprinkles as s,
  RequiredResponsiveObject,
} from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { breakpoints } from "~/styles/tokens";

const base = style([
  // s({
  //   width: {
  //     tablet: "1/2",
  //     desktop: "1/3",
  //   },
  // }),
  {
    borderRadius: "7px",
  },
]);

export const image = style({
  width: "53px",
  height: "53px",
  "@media": {
    [`screen and (max-width: ${breakpoints.desktop}px)`]: {
      width: "40px",
      height: "40px",
    },
  },
});

export const semocolon = style({
  margin: "0 8px",
});

export const dollar = style({
  marginBottom: "5px",
});

export const greyBox = style([
  base,
  {
    backgroundColor: themeVars.colors.cardBg,
    width: "234px",
    height: "92px",
    paddingLeft: "17px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "179",
        height: "96px",
        paddingLeft: "15px",
      },
    },
  },
]);

export const greenBox = style([
  base,
  {
    backgroundColor: themeVars.colors.greenBg,
  },
]);

// const variant = {
//   solid: style({
//     borderRadius: themeVars.radii.md,
//     fontWeight: themeVars.fontWeight.semibold,
//   }),
//   outlined: style({}),
//   link: style({}),
//   ghost: style({}),
// };

// const intent = {
//   primary: style({
//     backgroundColor: themeVars.colors.primary500,
//     color: themeVars.colors.white,
//     selectors: {
//       "&:hover": {
//         backgroundColor: themeVars.colors.primary400,
//       },
//     },
//   }),
//   secondary: style({
//     backgroundColor: themeVars.colors.gray100,
//     color: themeVars.colors.gray600,
//     selectors: {
//       "&:hover": {
//         color: themeVars.colors.gray500,
//         backgroundColor: themeVars.colors.gray200,
//       },
//     },
//   }),
//   disabled: style({
//     cursor: "not-allowed",
//     color: "#B4BECC",
//     backgroundColor: themeVars.colors.gray50,
//   }),
// };

// // const size = {
// //   sm: s({
// //     fontSize: "sm",
// //     px: "6",
// //     py: "4",
// //   }),
// //   md: s({
// //     fontSize: "lg",
// //     px: "8",
// //     py: "6",
// //   }),
// //   lg: s({
// //     fontSize: "xl",
// //     px: "9",
// //     py: "9",
// //   }),
// // };

// export const variants = recipe({
//   base: style({
//     // fontFamily: themeVars.font.body,
//     // fontWeight: themeVars.fontWeight.semibold,
//     // cursor: "pointer",
//     // appearance: "none",
//     // border: "none",
//     // position: "relative",
//     // userSelect: "none",
//     // whiteSpace: "nowrap",
//     // verticalAlign: "middle",
//     // lineHeight: 1.2,
//     // transitionProperty:
//     //   "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
//     // transitionDuration: "200ms",
//     // display: "flex",
//     // justifyContent: "center",
//     // alignItems: "center",
//     // height: "auto",
//   }),
//   variants: {
//     // variant,
//     // intent,
//     // size,
//   },
//   defaultVariants: {
//     // variant: "solid",
//     // intent: "primary",
//     // size: "md",
//   },
// });

// export type Variants = RecipeVariants<typeof variants>;
