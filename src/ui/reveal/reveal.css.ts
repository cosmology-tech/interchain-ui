import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  overflow: "hidden",
});

export const shadow = styleVariants({
  light: [
    {
      backgroundImage:
        "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
    },
  ],
  dark: [
    {
      backgroundImage:
        "linear-gradient(rgba(44, 49, 55, 0), rgba(44, 49, 55, 1))",
    },
  ],
});
