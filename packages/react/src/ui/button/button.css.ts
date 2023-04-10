import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const buttonStyles = style({
  border: `none`,
  background: `none`,
  color: themeVars.colors.link,
  borderWidth: `1px`,
  borderStyle: `solid`,
  borderColor: `transparent`,
  transition: `all 0.3s ease-in-out`,
  borderRadius: themeVars.radii.sm,
  paddingLeft: themeVars.space[4],
  paddingRight: themeVars.space[4],
  selectors: {
    "&:hover": {
      color: themeVars.colors.linkHover,
      cursor: `pointer`,
      borderColor: themeVars.colors.linkHover,
    },
  },
});
