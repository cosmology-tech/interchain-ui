import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

export const circle = style({
  fill: "transparent",
  stroke: themeVars.colors.cardBg,
  strokeLinecap: "round",
});
export const filledCircle = style({
  fill: "transparent",
  strokeLinecap: "round",
  stroke: themeVars.colors.text,
  transform: "rotate(-90deg)",
  transformOrigin: "50% 50%",
  transition: "stroke-dashoffset 0.5s ease-out",
});

export const container = style({
  position: "relative",
});

export const percentText = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
});
