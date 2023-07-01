import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const assetListHeader = style({
  minWidth: "720px",
  boxSizing: "border-box",
});

export const crossContainer = style([
  {
    minHeight: "103px",
  },
]);

export const card = sprinkles({
  p: "10",
  backgroundColor: "cardBg",
  width: "1/3",
  borderRadius: "lg",
});

export const crossBtn = sprinkles({
  width: "1/3",
});

export const singleContainer = style([
  sprinkles({
    width: "full",
    minHeight: "21",
    p: "10",
    backgroundColor: "cardBg",
    borderRadius: "lg",
  }),
  {
    boxSizing: "border-box",
  },
]);
