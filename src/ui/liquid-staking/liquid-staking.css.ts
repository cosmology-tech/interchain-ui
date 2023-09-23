import { styleVariants, keyframes } from "@vanilla-extract/css";

const expandVertical = keyframes({
  "0%": { opacity: "0", height: "32px" },
  "100%": { opacity: "1", height: "480px" },
});

const expandVerticalReverse = keyframes({
  "0%": { height: "480px" },
  "100%": { height: "32px" },
});

export const accordionPanel = styleVariants({
  expanded: [
    {
      height: 480,
      overflow: "auto",
      animation: `${expandVertical} 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
  contracted: [
    {
      height: 32,
      opacity: 1,
      overflow: "hidden",
      animation: `${expandVerticalReverse} 600ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
});
