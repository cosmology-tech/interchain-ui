import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const dividerBgVar = createVar();

export const swapPriceContainer = style([
  {
    borderTop: `2px solid ${themeVars.colors.cardBg}`,
  },
  sprinkles({}),
]);

export const img = sprinkles({
  width: "12",
  height: "12",
});

export const absImg = sprinkles({
  position: "absolute",
  right: "0",
});

export const routeDivider = style([
  sprinkles({
    height: "1",
    px: "7",
  }),
  {
    flex: 1,
    background: `repeating-linear-gradient(90deg, ${themeVars.colors.divider} 0 4px, #0000 0 12px)`,
  },
]);

export const priceContainer = style({
  overflow: "hidden",
  maxHeight: "0",
});
