import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const container = style([
  sprinkles({
    minHeight: "21",
  }),
  {
    minWidth: "216px",
    boxSizing: "border-box",
  },
]);
