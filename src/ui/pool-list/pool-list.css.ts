import { style } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { breakpoints } from "../../styles/tokens";

export const container = style([
  s({
    paddingTop: "10",
  }),
  {
    width: "752px",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
        minWidth: "400px",
      },
    },
  },
]);

export const titleContainer = style([
  s({
    my: "9",
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
  py: "6",
});
