import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

export const connectModalShadowVar = createVar();
export const connectModalBgVar = createVar();

const modalContentBase = style([
  style({
    boxShadow: connectModalShadowVar,
    backgroundColor: connectModalBgVar,
  }),
  s({
    display: "flex",
    flexDirection: "column",
    height: "auto",
    borderRadius: "xl",
  }),
]);

export const modalContent = styleVariants({
  light: [
    style({
      vars: {
        [connectModalBgVar]: themeVars.colors.white,
        [connectModalShadowVar]:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    }),
    modalContentBase,
  ],
  dark: [
    style({
      vars: {
        [connectModalBgVar]: themeVars.colors.gray700,
        [connectModalShadowVar]:
          "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
      },
    }),
    modalContentBase,
  ],
});

export const modalChildren = style([
  {
    width: "320px",
    boxSizing: "border-box",
  },
  s({
    paddingLeft: "8",
    paddingRight: "8",
    paddingTop: "3",
    paddingBottom: "10",
  }),
]);

export const modalAnimateContainer = style({
  minHeight: themeVars.space[30],
});
