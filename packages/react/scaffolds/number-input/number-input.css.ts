import { style } from "@vanilla-extract/css";

export const borderless = style({
  border: "0 !important",
  paddingTop: "0 !important",
  paddingBottom: "0 !important",
  selectors: {
    "&:focus": {
      boxShadow: "none !important",
    },
  },
});

export const withStartAddon = style({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

export const withEndAddon = style({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});
