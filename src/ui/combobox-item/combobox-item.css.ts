import { style } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

export const comboboxItem = style([
  {
    listStyle: "none",
    cursor: "pointer",
    backgroundColor: themeVars.colors.comboboxItemBg,
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.colors.comboboxItemBgHover,
      },
    },
  },
  s({
    px: "6",
    py: "7",
    borderRadius: "md",
  }),
]);

export const comboboxItemActive = style({
  backgroundColor: themeVars.colors.comboboxItemBgActive,
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.colors.comboboxItemBgActive,
    },
  },
});
