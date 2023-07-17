import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const containerStyleBase = style([
  {
    cursor: "pointer",
    position: "relative",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    minHeight: "fit-content",
    paddingInlineStart: themeVars.space[4],
    paddingInlineEnd: themeVars.space[4],
  },
  s({
    py: "1",
    width: "full",
    height: "auto",
    minHeight: "12",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "normal",
    lineHeight: "normal",
    borderColor: {
      light: "gray200",
      dark: "whiteAlpha300",
    },
    color: {
      light: "gray500",
      dark: "whiteAlpha600",
    },
  }),
]);

export const containerStyle = styleVariants({
  light: [
    containerStyleBase,
    s({
      borderColor: "gray200",
      color: "gray500",
    }),
  ],
  dark: [
    containerStyleBase,
    s({
      borderColor: "whiteAlpha300",
      color: "whiteAlpha600",
    }),
  ],
});

export const textStyle = style([
  {
    color: "inherit",
  },
  s({
    marginRight: "4",
  }),
]);

export const truncateEndStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const iconStyle = {
  idle: style({ color: "inherit" }),
  copied: styleVariants({
    light: [s({ color: "green300" })],
    dark: [s({ color: "green400" })],
  }),
};
