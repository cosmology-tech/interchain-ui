import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const swapBorderColorVar = createVar();

export const swapTokenContainer = style({
  maxWidth: "500px",
});

export const switchContainer = style({
  height: themeVars.space[7],
  position: "relative",
});

const swapIconBase = style([
  {
    vars: {
      [swapBorderColorVar]: themeVars.colors.white,
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: `3px solid ${swapBorderColorVar}`,
  },
]);

export const swapIcon = styleVariants({
  light: [swapIconBase],
  dark: [
    swapIconBase,
    style({
      vars: {
        [swapBorderColorVar]: themeVars.colors.gray700,
      },
    }),
  ],
});

export const settingContainer = style({
  flex: 1,
  height: "100%",
  overflow: "hidden",
});

export const percentContainer = style({
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "-400px",
});

export const rel = style({
  position: "relative",
  zIndex: 1,
});
