import { style, createVar } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

export const connectModalShadowVar = createVar();

export const headerText = s({
  display: "block",
  textAlign: "center",
  fontSize: "md",
  fontWeight: "semibold",
  width: "full",
  height: "full",
  color: {
    light: "gray700",
    dark: "whiteAlpha900",
  },
});

export const modalContent = style([
  {
    vars: {
      [connectModalShadowVar]:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [connectModalShadowVar]:
            "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
        },
      },
    },
    boxShadow: connectModalShadowVar,
  },
  s({
    display: "flex",
    flexDirection: "column",
    height: "auto",
    borderRadius: "xl",
    backgroundColor: {
      light: "white",
      dark: "gray700",
    },
  }),
]);

export const modalHeader = s({
  px: "8",
  py: "8",
});

export const modalCloseButton = style({
  marginRight: themeVars.space[5],
});
