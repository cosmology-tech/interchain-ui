import { style, createVar } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";

export const connectModalShadowVar = createVar();

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

export const modalChildren = style([
  {
    maxWidth: "320px",
  },
  s({
    paddingLeft: "10",
    paddingRight: "10",
    paddingTop: "10",
    paddingBottom: "14",
  }),
]);
