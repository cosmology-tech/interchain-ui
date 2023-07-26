import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

export const connectModalShadowVar = createVar();
export const connectModalBgVar = createVar();

const modalContentBase = style([
  style({
    boxShadow: connectModalShadowVar,
    backgroundColor: connectModalBgVar,
    maxHeight: "100%",
    overflowY: "auto",
    '::-webkit-scrollbar': {
      display: "none"
    }
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
        [connectModalBgVar]: themeVars.colors.blackPrimary,
        [connectModalShadowVar]:
          "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
      },
    }),
    modalContentBase,
  ],
});

export const modalChildren = style([
  {
    minWidth: "320px",
  },
  s({
    paddingLeft: "9",
    paddingRight: "9",
    paddingBottom: "9",
  }),
]);

export const modalHeader = s({
  paddingTop: "4",
  paddingLeft: "9",
  paddingRight: "4",
  paddingBottom: "8"
})
