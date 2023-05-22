import { style, createVar } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const listBottomShadowBgVar = createVar();

export const container = style({
  position: "relative",
});

export const walletList = style([
  {
    maxHeight: "320px",
    overflow: "auto",
    scrollbarWidth: "none",
    selectors: {
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  },
  s({
    paddingTop: "2",
    paddingBottom: "8",
    px: "8",
  }),
]);

export const squareWallets = style({
  display: "grid",
  columnGap: themeVars.space[5],
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  marginBottom: themeVars.space[5],
});

export const listWallets = style([
  {
    display: "grid",
    rowGap: themeVars.space[2],
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  },
  s({
    paddingBottom: "4",
  }),
]);

export const bottomShadow = style([
  {
    vars: {
      [listBottomShadowBgVar]:
        "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%);",
    },
    height: "36px",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    background: listBottomShadowBgVar,
  },
]);
