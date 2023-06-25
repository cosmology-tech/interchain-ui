import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { breakpoints } from "../../styles/tokens";

export const container = style([
  sprinkles({
    backgroundColor: "cardBg",
    p: "10",
    borderRadius: "lg",
  }),
  {
    boxSizing: "border-box",
    height: "fit-content",
    "@media": {
      [`screen and (min-width: ${breakpoints.tablet}px)`]: {
        width: "236px",
      },
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
        minWidth: "236px",
      },
    },
  },
]);

export const divider = styleVariants({
  light: {
    backgroundColor: "#D1D6DD",
  },
  dark: {
    backgroundColor: "#434B55",
  },
});
