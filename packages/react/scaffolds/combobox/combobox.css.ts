import { style, styleVariants } from "@vanilla-extract/css";
import { scrollBar } from "@/ui/shared/shared.css";
import { themeVars } from "@/styles/themes.css";
// @ts-ignore
import { listBoxBaseWithShadow } from "../select/select.css.ts";

export const comboboxPopover = style({
  paddingTop: themeVars.space[5],
});

export const listboxStyle = styleVariants({
  light: [
    listBoxBaseWithShadow,
    scrollBar.light,
    style({
      borderColor: "#D1D6DD",
    }),
  ],
  dark: [
    listBoxBaseWithShadow,
    scrollBar.dark,
    style({
      borderColor: "#434B55",
    }),
  ],
});
