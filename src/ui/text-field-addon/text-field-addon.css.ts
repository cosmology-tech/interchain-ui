import { style, styleVariants } from "@vanilla-extract/css";
import {
  inputBgVar,
  inputBorderColorVar,
  inputBorderRadiusVar,
  inputBorderWidthVar,
  inputPaddingXVar,
  inputPaddingYVar,
  inputHeightVar,
  zIndexConfig,
  rootInput,
  input,
  borderFocusedLight,
  borderFocusedDark,
} from "../text-field/text-field.css";

export const textFieldAddon = style({
  display: "flex",
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  position: "relative",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  height: inputHeightVar,
  background: inputBgVar,
  zIndex: zIndexConfig.inputAddon,
  borderColor: "transparent",
  borderWidth: "1px",
  borderStyle: "solid",
  selectors: {
    [`${rootInput}[data-element-type='textarea'] &`]: {
      display: "none",
    },
    [`${input}[data-intent='none'][data-theme='light']:focus-within ~ &`]:
      borderFocusedLight,
    [`${input}[data-intent='none'][data-theme='dark']:focus-within ~ &`]:
      borderFocusedDark,
  },
});

export const textFieldAddonPositions = styleVariants({
  end: [
    style({
      right: 0,
      left: "auto",
      top: 0,
      bottom: 0,
      borderTopRightRadius: inputBorderRadiusVar,
      borderBottomRightRadius: inputBorderRadiusVar,
    }),
  ],
  start: [
    style({
      left: 0,
      right: "auto",
      top: 0,
      bottom: 0,
      borderTopLeftRadius: inputBorderRadiusVar,
      borderBottomLeftRadius: inputBorderRadiusVar,
    }),
  ],
});

// export const textFieldAddonSizes = styleVariants({
//   sm: [
//     style({
//       paddingLeft: themeVars.space[6],
//       paddingRight: themeVars.space[6],
//       paddingTop: themeVars.space[4],
//       paddingBottom: themeVars.space[4],
//     }),
//   ],
//   md: [
//     style({
//       paddingLeft: themeVars.space[8],
//       paddingRight: themeVars.space[8],
//       paddingTop: themeVars.space[4],
//       paddingBottom: themeVars.space[4],
//     }),
//   ],
// });

export const textFieldAddonDivider = styleVariants({
  end: [
    style({
      position: "relative",
      paddingRight: 0,
      paddingLeft: inputPaddingXVar,
      paddingTop: inputPaddingYVar,
      paddingBottom: inputPaddingYVar,
      marginLeft: inputPaddingXVar,
      selectors: {
        "&:before": {
          content: '""',
          position: "absolute",
          top: `calc(-1 * ${inputBorderWidthVar})`,
          bottom: `calc(-1 * ${inputBorderWidthVar})`,
          left: 0,
          width: inputBorderWidthVar,
          background: inputBorderColorVar,
          transition: "all 200ms",
        },
      },
    }),
  ],
  start: [
    style({
      position: "relative",
      paddingRight: inputPaddingXVar,
      paddingLeft: 0,
      paddingTop: inputPaddingYVar,
      paddingBottom: inputPaddingYVar,
      marginRight: inputPaddingXVar,
      selectors: {
        "&:before": {
          content: '""',
          position: "absolute",
          top: `calc(-1 * ${inputBorderWidthVar})`,
          bottom: `calc(-1 * ${inputBorderWidthVar})`,
          right: 0,
          width: inputBorderWidthVar,
          background: inputBorderColorVar,
          transition: "all 200ms",
        },
      },
    }),
  ],
});
