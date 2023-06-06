import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { breakpoints } from "../../styles/tokens";

export const inputBox = style([
  {
    height: "68px",
    flex: 1,
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
      },
    },
  },
]);

export const imgBox = style({
  width: '68px',
  height: "68px"
})

export const img = style({
  width: "38px",
  height: "38px",
})
