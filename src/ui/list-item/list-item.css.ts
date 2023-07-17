import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import { baseTextStyles } from "../text/text.css";

export const listItemBase = style([
  baseTextStyles,
  {
    listStyle: "none",
    cursor: "pointer",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
  },
  s({
    color: "text",
    borderRadius: "md",
  }),
]);

export const listItemActive = styleVariants({
  active: [
    listItemBase,
    style({
      backgroundColor: themeVars.colors.menuItemBgActive,
      selectors: {
        "&:hover": {
          backgroundColor: themeVars.colors.menuItemBgActive,
        },
      },
    }),
  ],
  inactive: [
    listItemBase,
    style({
      backgroundColor: themeVars.colors.menuItemBg,
      selectors: {
        "&:hover": {
          backgroundColor: themeVars.colors.menuItemBgHovered,
        },
      },
    }),
  ],
});

export const listItemSizes = styleVariants({
  sm: [
    s({
      height: "14",
      py: "4",
      px: "6",
    }),
  ],
  md: [
    s({
      height: "17",
      py: "10",
      px: "8",
    }),
  ],
});
