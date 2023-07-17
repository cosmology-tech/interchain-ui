import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { childSelectors } from "../../helpers/style";

export const gapVar = createVar();

const stackBaseStyle = style({
  display: "flex",
  justifyContent: "flex-start",
});

export const stackCore = styleVariants({
  recursiveVertical: [style({})],
  nonRecursiveVertical: [style({})],
  recursiveHoriz: [style({})],
  nonRecursiveHoriz: [style({})],
});

export const stackDir = styleVariants({
  vertical: [
    stackBaseStyle,
    {
      flexDirection: "column",
    },
  ],
  horizontal: [
    stackBaseStyle,
    {
      flexDirection: "row",
    },
  ],
});

childSelectors(stackBaseStyle, "> *", {
  marginBlock: 0,
  marginInline: 0,
});

childSelectors(stackCore.recursiveVertical, "* + *", {
  marginBlockStart: gapVar,
});

childSelectors(stackCore.nonRecursiveVertical, "> * + *", {
  marginBlockStart: gapVar,
});

childSelectors(stackCore.recursiveHoriz, "* + *", {
  marginInlineStart: gapVar,
});

childSelectors(stackCore.nonRecursiveHoriz, "> * + *", {
  marginInlineStart: gapVar,
});
