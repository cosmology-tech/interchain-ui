import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  overflow: "hidden",
});

export const shadow = styleVariants({
  light: [
    {
      backgroundImage: "linear-gradient(transparent, white)",
    },
  ],
  dark: [
    {
      backgroundImage: "linear-gradient(transparent, #2C3137)",
    },
  ],
});

export const moreBox = style({
  cursor: "pointer",
  position: "absolute",
  bottom: 0,
  width: "100%",
});

export const btnContainer = style({
  display: "flex",
  alignItems: "center",
});

export const content = style({
  overflow: "hidden",
});
