import { style, createVar } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const swapBorderColorVar = createVar();

export const swapTokenContainer = style({
  minWidth: "468px",
});

export const switchContainer = style([
  sprinkles({
    height: "7",
    position: "relative",
  }),
]);

export const swapIcon = style([
  {
    vars: {
      [swapBorderColorVar]: themeVars.colors.white,
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [swapBorderColorVar]: themeVars.colors.gray700,
        },
      },
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: `3px solid ${swapBorderColorVar}`,
  },
]);

export const settingContainer = style({
  flex: 1,
  height: "100%",
  overflow: "hidden",
});

export const percentContainer = style({
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "-300px",
});
