import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { themeVars } from "./themes.css";
import { breakpoints } from "./tokens";

const extendedSpace = {
  "1/5": "20%",
  "1/4": "25%",
  "1/3": "33.333333%",
  "1/2": "50%",
  "2/3": "66.666667%",
  "3/4": "75%",
};

const allSpace = { ...themeVars.space, ...extendedSpace };

const margins = themeVars.space;

const responsiveProperties = defineProperties({
  conditions: transformBreakpoints<{
    mobile: {};
    tablet: {};
    desktop: {};
    mdMobile: {};
  }>(breakpoints),
  defaultCondition: "mobile",
  dynamicProperties: {
    display: true,
    backgroundImage: true,
    backgroundSize: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    objectFit: true,
    flex: true,
    flexBasis: true,
    flexShrink: true,
    flexGrow: true,
    flexDirection: true,
    flexWrap: true,
    alignItems: true,
    justifyContent: true,
    padding: allSpace,
    paddingLeft: allSpace,
    paddingRight: allSpace,
    paddingTop: allSpace,
    paddingBottom: allSpace,
    width: allSpace,
    height: allSpace,
    minWidth: allSpace,
    minHeight: allSpace,
    maxWidth: allSpace,
    maxHeight: allSpace,
    borderRadius: themeVars.radii,
    borderTopLeftRadius: true,
    borderBottomLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
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
    overflowX: true,
    overflowY: true,
    textOverflow: true,
    aspectRatio: true,
    opacity: true,
    cursor: true,
    gridTemplateColumns: true,
    grid: true,
    gridArea: true,
    gridAutoColumns: true,
    gridAutoFlow: true,
    gridAutoRows: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridTemplate: true,
    gridTemplateAreas: true,
    gridTemplateRows: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    gap: themeVars.space,
    columnGap: themeVars.space,
    rowGap: themeVars.space,
    insetInlineStart: true,
    insetInlineEnd: true,
    transform: true,
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
    m: ["margin"],
    mr: ["marginRight"],
    ml: ["marginLeft"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    placeItems: ["alignItems", "justifyContent"],
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
    visibility: true,
    backgroundColor: themeVars.colors,
    borderWidth: themeVars.borderWidth,
    borderStyle: themeVars.borderStyle,
    borderColor: themeVars.colors,
    boxShadow: themeVars.boxShadow,
    transform: true,
    transition: true,
    animation: true,
    textDecoration: true,
    zIndex: themeVars.zIndex,
    fontVariantNumeric: true,
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
