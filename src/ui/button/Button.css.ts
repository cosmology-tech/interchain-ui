import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const buttonStyles = style({
  border: `none`,
  background: `none`,
  color: vars.colors.link,
  borderWidth: `1px`,
  borderStyle: `solid`,
  borderColor: `transparent`,
  transition: `all 0.3s ease-in-out`,
  borderRadius: vars.radii.sm,
  paddingLeft: vars.space.sm,
  paddingRight: vars.space.sm,
  selectors: {
    "&:hover": {
      color: vars.colors.linkHover,
      cursor: `pointer`,
      borderColor: vars.colors.linkHover,
    },
  },
});
