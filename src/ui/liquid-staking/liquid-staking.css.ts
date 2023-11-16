import { styleVariants, keyframes } from "@vanilla-extract/css";

const EXPANDED_HEIGHT_PX = `458px`;
const CONTRACTED_HEIGHT_PX = `32px`;

const expandVertical = keyframes({
  "0%": { opacity: "0", height: CONTRACTED_HEIGHT_PX },
  "100%": { opacity: "1", height: EXPANDED_HEIGHT_PX },
});

const expandVerticalReverse = keyframes({
  "0%": { height: EXPANDED_HEIGHT_PX },
  "100%": { height: CONTRACTED_HEIGHT_PX },
});

export const accordionPanel = styleVariants({
  expanded: [
    {
      height: EXPANDED_HEIGHT_PX,
      overflow: "auto",
      animation: `${expandVertical} 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
  contracted: [
    {
      height: CONTRACTED_HEIGHT_PX,
      opacity: 1,
      overflow: "hidden",
      animation: `${expandVerticalReverse} 600ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
});
