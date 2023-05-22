import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  sprinkles as s,
  RequiredResponsiveObject,
} from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { breakpoints } from "~/styles/tokens";

export const container = style([
  {
    minWidth: "400px",
    marginTop: "27px",
    transition: "ease all .5s",
    flexWrap: "nowrap",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        flexWrap: "wrap",
      },
    },
  },
]);

const base = style([
  // s({
  //   width: {
  //     tablet: "1/2",
  //     desktop: "1/3",
  //   },
  // }),
  {
    display: "flex",
    alignItems: "center",
    borderRadius: "7px",
  },
]);
export const mb3 = style({
  marginBottom: "3px",
});

export const image = style({
  width: "53px",
  height: "53px",
  marginRight: "21px",
  "@media": {
    [`screen and (max-width: ${breakpoints.desktop}px)`]: {
      width: "40px",
      height: "40px",
      marginRight: "13px",
    },
  },
});

export const semocolon = style({
  margin: "0 8px",
});

export const dollar = style({
  marginBottom: "5px",
});

export const baseBox = style([
  base,
  {
    backgroundColor: themeVars.colors.cardBg,
    minWidth: "234px",
    height: "92px",
    paddingLeft: "17px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        minWidth: "179px",
        height: "96px",
        paddingLeft: "15px",
        paddingRight: "0px",
      },
    },
  },
]);

export const rewardBox = style([
  base,
  {
    backgroundColor: themeVars.colors.rewardBg,
    color: themeVars.colors.rewardContent,
    minWidth: "234px",
    height: "92px",
    paddingLeft: "15px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        minWidth: "382px",
        height: "96px",
        paddingLeft: "15px",
        paddingRight: "0px",
      },
    },
  },
]);

export const osom = style({
  margin: "0 14px 3px 2px",
});

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
