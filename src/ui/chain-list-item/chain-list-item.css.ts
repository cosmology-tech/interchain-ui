import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const menuItemBgVar = createVar();
// `#EEF2F8`,
const menuItemBgHoveredVar = createVar();
// `#DDE4ED`,
const menuItemBgActiveVar = createVar();
// `#D0D9E3`

export const chainLogoBase = style({
  display: "block",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "50%",
  background: themeVars.colors.skeletonBg,
});

export const chainLogoSizes = styleVariants({
  sm: [
    chainLogoBase,
    style({
      width: "24px",
      height: "24px",
    }),
  ],
  md: [
    chainLogoBase,
    style({
      width: "38px",
      height: "38px",
    }),
  ],
});

export const listItem = styleVariants({
  light: [
    {
      vars: {
        [menuItemBgVar]: "#EEF2F8",
        [menuItemBgHoveredVar]: themeVars.colors.menuItemBgActive,
        [menuItemBgActiveVar]: "#D0D9E3",
      },
      backgroundColor: `${menuItemBgVar} !important`,
      selectors: {
        "&:hover": {
          backgroundColor: `${menuItemBgHoveredVar} !important`,
        },
        '&[data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
        '&[data-is-selected="true"][data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
      },
    },
  ],
  dark: [],
});
