import {
  style,
  styleVariants,
  keyframes,
  createContainer,
} from "@vanilla-extract/css";

const EXPANDED_HEIGHT_PX = `458px`;
const CONTRACTED_HEIGHT_PX = `32px`;
export const liqStakingRootContainer = createContainer();

export const root = style({
  containerName: liqStakingRootContainer,
});

const expandVertical = keyframes({
  "0%": { opacity: "0", height: CONTRACTED_HEIGHT_PX },
  "100%": { opacity: "1", height: EXPANDED_HEIGHT_PX },
});

const expandVerticalReverse = keyframes({
  "0%": { height: EXPANDED_HEIGHT_PX },
  "100%": { height: CONTRACTED_HEIGHT_PX },
});

export const accordionBase = style({
  position: "relative",
});

export const accordionPanel = styleVariants({
  expanded: [
    accordionBase,
    {
      height: EXPANDED_HEIGHT_PX,
      overflow: "auto",
      animation: `${expandVertical} 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
  contracted: [
    accordionBase,
    {
      height: CONTRACTED_HEIGHT_PX,
      opacity: 1,
      overflow: "hidden",
      animation: `${expandVerticalReverse} 600ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  ],
});
