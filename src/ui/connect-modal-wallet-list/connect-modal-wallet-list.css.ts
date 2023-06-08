import { style } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

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
