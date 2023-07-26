import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";

const modalHeaderTextBase = s({
  display: "block",
  textAlign: "center",
  fontSize: "md",
  fontWeight: "semibold",
  width: "full",
  height: "full",
  m: "0"
});

export const modalHeaderText = styleVariants({
  light: [modalHeaderTextBase, s({ color: "gray700" })],
  dark: [modalHeaderTextBase, s({ color: "whiteAlpha900" })],
});

export const modalHeader = style([
  {
    position: "relative",
    display: "flex",
  },
  s({
    fontFamily: "body",
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
