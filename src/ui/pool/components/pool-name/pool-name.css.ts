import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../../../styles/sprinkles.css";
import { breakpoints } from "../../../../styles/tokens";

export const imageBox = style([
  s({
    minWidth: "18",
    height: "14",
    marginRight: "8",
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

export const responsiveText = s({
  width: {
    desktop: "1/5",
    mobile: "1/3",
  },
});

export const rank = style({
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      marginLeft: "-46px",
    },
  },
});
