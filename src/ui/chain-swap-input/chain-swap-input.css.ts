import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { chainLogoBase } from "../chain-list-item/chain-list-item.css";

export const container = style({
  display: "block",
});

export const chainSwapInputBase = style({
  display: "block",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontFamily: themeVars.font.body,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  color: themeVars.colors.textPlaceholder,
  selectors: {
    [`&[data-input-value="true"]`]: {
      color: themeVars.colors.text,
    },
    "&:focus": {
      color: themeVars.colors.text,
    },
  },
});

export const chainSwapInput = styleVariants({
  md: [
    chainSwapInputBase,
    style({
      maxWidth: "166px",
      height: themeVars.space[11],
      fontSize: themeVars.fontSize["2xl"],
      fontWeight: themeVars.fontWeight.semibold,
    }),
  ],
  sm: [
    chainSwapInputBase,
    style({
      maxWidth: "120px",
      height: themeVars.space[8],
      fontSize: themeVars.fontSize["sm"],
      fontWeight: themeVars.fontWeight.normal,
    }),
  ],
});

export const chainSwapLogo = styleVariants({
  md: [
    chainLogoBase,
    {
      width: "50px",
      height: "50px",
    },
  ],
  sm: [
    chainLogoBase,
    {
      width: "28px",
      height: "28px",
    },
  ],
});
