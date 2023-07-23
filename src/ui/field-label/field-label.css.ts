import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { baseTextStyles } from "../text/text.css";

export const fieldlabelStyle = style([
  baseTextStyles,
  style({ lineHeight: "normal" }),
  s({
    fontWeight: "semibold",
    color: "textSecondary",
  }),
]);

export const fieldLabelSizes = styleVariants({
  sm: [
    s({
      fontSize: "sm",
    }),
  ],
  md: [
    s({
      fontSize: "md",
    }),
  ],
  lg: [
    s({
      fontSize: "xl",
    }),
  ],
});
