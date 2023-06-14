import { style } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";

export const modalHeaderText = s({
  display: "block",
  textAlign: "center",
  fontSize: "md",
  fontWeight: "semibold",
  width: "full",
  height: "full",
  color: {
    light: "gray700",
    dark: "whiteAlpha900",
  },
});

export const modalHeader = style([
  {
    position: "relative",
    display: "flex",
  },
  s({
    px: "8",
    py: "8",
  }),
]);

export const modalBackButton = style([
  {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  s({
    marginLeft: "5",
  }),
]);

export const modalCloseButton = style([
  {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  s({
    marginRight: "5",
  }),
]);
