import { style } from "@vanilla-extract/css";

export const arrow = style({
  zIndex: 999,
});

export const contentWrapper = style({
  zIndex: 999,
  ":focus": {
    outline: "none",
  },
});
