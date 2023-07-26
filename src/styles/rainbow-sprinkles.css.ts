import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { calc } from "@vanilla-extract/css-utils";
import { themeVars } from "./themes.css";
import { breakpoints } from "./tokens";

const negativeSpace = {
  ["-px"]: `-1px`,
  ["-1"]: `${calc(themeVars.space["1"]).negate()}`,
  ["-2"]: `${calc(themeVars.space["2"]).negate()}`,
  ["-3"]: `${calc(themeVars.space["3"]).negate()}`,
  ["-4"]: `${calc(themeVars.space["4"]).negate()}`,
  ["-5"]: `${calc(themeVars.space["4"]).negate()}`,
  ["-6"]: `${calc(themeVars.space["4"]).negate()}`,
};

const extendedSpace = {
  "1/5": "20%",
  "1/4": "25%",
  "1/3": "33.333333%",
  "1/2": "50%",
  "2/3": "66.666667%",
  "3/4": "75%",
};

const allSpace = { ...themeVars.space, ...extendedSpace };

const margins = {
  ...themeVars.space,
  ...negativeSpace,
};

const responsiveProperties = defineProperties({
  conditions: transformBreakpoints<{ mobile: {}; tablet: {}; desktop: {} }>(
    breakpoints
  ),
  defaultCondition: "mobile",
  dynamicProperties: {
    display: true,
    flex: true,
    flexDirection: true,
    flexWrap: true,
    alignItems: true,
    justifyContent: true,
    gap: themeVars.space,
    padding: allSpace,
    paddingLeft: allSpace,
    paddingRight: allSpace,
    paddingTop: allSpace,
    paddingBottom: allSpace,
    width: true,
    height: true,
    minWidth: true,
    minHeight: true,
    maxWidth: true,
    maxHeight: true,
    borderRadius: themeVars.radii,
    fontFamily: themeVars.font,
    fontSize: themeVars.fontSize,
    lineHeight: themeVars.lineHeight,
    textAlign: true,
    zIndex: themeVars.zIndex,
    position: true,
    top: margins,
    left: margins,
    right: margins,
    bottom: margins,
    verticalAlign: true,
    margin: margins,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    letterSpacing: themeVars.letterSpacing,
    textTransform: true,
    fontWeight: themeVars.fontWeight,
    whiteSpace: true,
    wordBreak: true,
    fill: true,
    overflow: true,
    textOverflow: true,
    textDecoration: true,
  },
  staticProperties: {
    width: allSpace,
    height: allSpace,
    minWidth: allSpace,
    minHeight: allSpace,
    maxWidth: allSpace,
    maxHeight: allSpace,
  },
  shorthands: {
    p: ["padding"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    placeItems: ["alignItems", "justifyContent"],
    typeSize: ["fontSize", "lineHeight"],
    m: ["margin"],
    mr: ["marginRight"],
    ml: ["marginLeft"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    size: ["height", "width"],
  },
});

const interactiveProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "base",
  dynamicProperties: {
    color: themeVars.colors,
    backgroundColor: themeVars.colors,
    borderWidth: themeVars.borderWidth,
    borderStyle: themeVars.borderStyle,
    borderColor: themeVars.colors,
    boxShadow: themeVars.boxShadow,
    transform: true,
    transition: true,
    animation: true,
    zIndex: true,
  },
  staticProperties: {
    zIndex: themeVars.zIndex,
  },
  shorthands: {
    bg: ["backgroundColor"],
    border: ["borderWidth", "borderStyle", "borderColor"],
  },
});

export const rainbowSprinkles = createRainbowSprinkles(
  responsiveProperties,
  interactiveProperties
);

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0];

function transformBreakpoints<Output>(input: Record<string, any>) {
  let responsiveConditions!: Output;

  Object.entries(input).forEach(([key, value]) => {
    if (value === 0) {
      responsiveConditions = {
        ...responsiveConditions,
        [key]: {},
      };
    } else {
      responsiveConditions = {
        ...responsiveConditions,
        [key]: {
          "@media": `screen and (min-width: ${value}px)`,
        },
      };
    }
  });

  return responsiveConditions;
}
