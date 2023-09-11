import { style } from "@vanilla-extract/css";

export const borderless = style({
  border: "0",
  padding: "0",
  selectors: {
    "&:focus": {
      boxShadow: "none",
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
