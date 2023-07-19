import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  position: "relative",
});

export const walletList = style({
  maxHeight: "320px",
  width: "100%",
  overflow: "auto",
  scrollbarWidth: "none",
  paddingBottom: themeVars.space[8],
  paddingTop: themeVars.space[1],
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none" /* Safari and Chrome */,
    },
  },
});

export const squareWallets = style({
  display: "grid",
  columnGap: themeVars.space[5],
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  marginBottom: themeVars.space[5],
  marginLeft: themeVars.space[1],
  marginRight: themeVars.space[1],
});

export const listWallets = style({
  display: "grid",
  rowGap: themeVars.space[2],
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  paddingBottom: themeVars.space[4],
  marginLeft: themeVars.space[1],
  marginRight: themeVars.space[1],
});
