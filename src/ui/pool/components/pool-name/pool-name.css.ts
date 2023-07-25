import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../../../styles/sprinkles.css";

export const imageBox = style([
  s({
    minWidth: "18",
    height: "14",
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

export const nameContainer = style({
  width: "133px"
})
