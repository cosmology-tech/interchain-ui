import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const background = styleVariants({
  purple: {
    background: "linear-gradient(180deg, #7310FF 15.1%, #7310FF 47.92%)",
  },
  dark: {
    background:
      "radial-gradient(72.04% 35.63% at 84.63% 53.83%, #4C5764 0%, #2C3137 100%)",
  },
});

export const button = style({
  marginTop: themeVars.space[15],
  background: "#EEF2F8",
  color: themeVars.colors.text,
  fontSize: themeVars.fontSize.sm,
});
