import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { inputBorderVar } from "../text-field/text-field.css";

export const textFieldAddon = style({
  color: "inherit",
  fontSize: "inherit",
  position: "absolute",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
});

export const textFieldAddonPositions = styleVariants({
  end: [
    style({
      right: 0,
      top: 0,
    }),
  ],
  start: [
    style({
      left: 0,
      top: 0,
    }),
  ],
});

export const textFieldAddonSizes = styleVariants({
  sm: [
    s({
      py: "4",
      px: "6",
    }),
  ],
  md: [
    s({
      py: "10",
      px: "8",
    }),
  ],
});

export const textFieldAddonDivider = styleVariants({
  end: [
    style({
      borderLeftWidth: "1px",
      borderLeftStyle: "solid",
      borderLeftColor: inputBorderVar,
    }),
  ],
  start: [
    style({
      borderRightWidth: "1px",
      borderRightStyle: "solid",
      borderRightColor: inputBorderVar,
    }),
  ],
});
