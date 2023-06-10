import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const inputContainer = style([
  sprinkles({
    borderColor: "inputBorder",
  }),
  {
    borderWidth: "1px",
    borderStyle: "solid",
    height: "68px",
  },
]);
export const token = style([
  sprinkles({
    width: "full",
    height: "full",
    backgroundColor: "cardBg",
  }),
  {
    border: 0,
    outline: 0,
  },
]);
