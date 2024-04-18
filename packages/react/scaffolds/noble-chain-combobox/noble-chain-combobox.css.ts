import { style, styleVariants } from "@vanilla-extract/css";
import { scrollBarThumbBgVar, scrollBar } from "@/ui/shared/shared.css";
import { themeVars } from "@/styles/themes.css";
import { listBoxBaseWithShadow } from "@/ui/select/select.css";

export const baseInputStyles = style({
  outline: "none",
  appearance: "none",
  selectors: {
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
  },
});

export const comboboxInputElement = style({
  color: "inherit",
  boxShadow: "none !important",
  appearance: "none",
});

export const comboboxPopover = style({
  backgroundColor: themeVars.colors.inputBg,
  borderBottomLeftRadius: themeVars.radii.lg,
  borderBottomRightRadius: themeVars.radii.lg,
});

export const hide = style({
  display: "none",
  pointerEvents: "none",
});

export const listboxStyle = styleVariants({
  light: [
    scrollBar.light,
    listBoxBaseWithShadow,
    style({
      vars: {
        [scrollBarThumbBgVar]: themeVars.colors.gray500,
      },
      maxHeight: "235px !important",
      boxShadow: `none !important`,
      borderTopWidth: `0 !important`,
      borderTopLeftRadius: `0 !important`,
      borderTopRightRadius: `0 !important`,
    }),
  ],
  dark: [
    scrollBar.dark,
    listBoxBaseWithShadow,
    style({
      vars: {
        [scrollBarThumbBgVar]: themeVars.colors.blue500,
      },
      maxHeight: "235px !important",
      boxShadow: `none !important`,
      borderTopWidth: `0 !important`,
      borderTopLeftRadius: `0 !important`,
      borderTopRightRadius: `0 !important`,
    }),
  ],
});
