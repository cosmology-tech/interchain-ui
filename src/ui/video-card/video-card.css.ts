import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const containerBase = style({
  cursor: "pointer",
  transition: "all 0.1s linear",
  ":hover": {
    opacity: 0.8,
  },
});

export const container = styleVariants({
  md: [containerBase, { width: "360px" }],
  sm: [containerBase, { width: "264px" }],
});

export const thumbnail = styleVariants({
  md: { borderRadius: themeVars.radii["4xl"], height: "244px" },
  sm: { borderRadius: themeVars.radii.lg, height: "178px" },
});

export const title = styleVariants({
  md: { fontSize: themeVars.fontSize.lg },
  sm: { fontSize: themeVars.fontSize.md },
});

export const duration = styleVariants({
  md: { fontSize: themeVars.fontSize.md },
  sm: { fontSize: themeVars.fontSize.sm },
});
