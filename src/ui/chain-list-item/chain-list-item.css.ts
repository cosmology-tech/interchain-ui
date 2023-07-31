import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const chainLogoBase = style({
  display: "block",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "50%",
  background: themeVars.colors.skeletonBg,
});

export const chainLogoSizes = styleVariants({
  sm: [
    chainLogoBase,
    style({
      width: "24px",
      height: "24px",
    }),
  ],
  md: [
    chainLogoBase,
    style({
      width: "38px",
      height: "38px",
    }),
  ],
});
