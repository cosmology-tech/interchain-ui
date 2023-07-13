import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { breakpoints } from "../../styles/tokens";

export const poolInfoHeader = style({
  minWidth: "350px",
});

export const imageBox = style([
  s({
    minWidth: "18",
    height: "14",
    marginRight: "10",
  }),
  {
    position: "relative",
  },
]);

export const imgBase = style([
  s({
    width: "14",
    height: "14",
  }),
  { position: "absolute" },
]);

export const image1 = style([
  imgBase,
  {
    left: 0,
  },
]);

export const image2 = style([
  imgBase,
  {
    right: 0,
  },
]);

export const longText = style([
  style({
    width: "calc(50% - 96px)",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "calc(100% - 96px)",
      },
    },
  }),
]);

export const shortText = style([
  s({
    width: "21",
  }),
]);

export const onlysm = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "none",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "block",
    },
  },
});
