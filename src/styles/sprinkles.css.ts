import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { calc } from "@vanilla-extract/css-utils";
import { themeVars } from "./themes.css";
import { breakpoints, Breakpoint, breakpointNames } from "./tokens";

const {
  space,
  colors,
  fontSize,
  font,
  fontWeight,
  radii,
  boxShadow,
  borderWidth,
  letterSpacing,
  lineHeight,
} = themeVars;

const flexAlignmentCommon = [
  "flex-start",
  "flex-end",
  "center",
  "stretch",
] as const;

const negativeSpace = {
  ["-px"]: `-1px`,
  ["-1"]: `${calc(space["1"]).negate()}`,
  ["-2"]: `${calc(space["2"]).negate()}`,
  ["-3"]: `${calc(space["3"]).negate()}`,
  ["-4"]: `${calc(space["4"]).negate()}`,
  ["-5"]: `${calc(space["4"]).negate()}`,
  ["-6"]: `${calc(space["4"]).negate()}`,
};

const extendedSpace = {
  "1/5": "20%",
  "1/4": "25%",
  "1/3": "33.333333%",
  "1/2": "50%",
  "2/3": "66.666667%",
  "3/4": "75%",
};

const margins = {
  ...space,
  ...negativeSpace,
};

const unresponsiveProperties = defineProperties({
  properties: {
    fontSize: {
      ...fontSize,
      inherit: "inherit",
    },
    fontFamily: font,
    textAlign: [`center`, `left`, `right`],
    textDecoration: [`none`, `underline`],
    borderRadius: radii,
    boxShadow,
    aspectRatio: {
      auto: "auto",
      "1/1": "1 / 1",
      "2/1": "2 / 1",
      "4/1": "4 / 1",
      "4/3": "4 / 3",
      "16/9": "16 / 9",
    },
    cursor: ["default", "pointer", "not-allowed"],
    isolation: ["isolate"],
    objectFit: ["contain", "cover"],
    pointerEvents: ["none"],
    strokeWidth: borderWidth,
    textTransform: ["capitalize", "lowercase", "uppercase"],
    transitionProperty: {
      none: "none",
      all: "all",
      default:
        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
      colors: "background-color, border-color, color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
    },
    transitionTimingFunction: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.42, 0, 0.58, 1)",
    },
    visibility: ["hidden", "visible"],
    whiteSpace: [
      "normal",
      "nowrap",
      "pre",
      "pre-line",
      "pre-wrap",
      "initial",
      "inherit",
    ],
    wordBreak: ["break-word"],
    wordWrap: ["normal", "break-word", "initial", "inherit"],
    zIndex: {
      "0": 0,
      "10": 10,
      "20": 20,
      "30": 30,
      "40": 40,
      "50": 50,
      "75": 75,
      "100": 100,
      auto: "auto",
    },
  },
});

const colorProperties = defineProperties({
  conditions: {
    light: {
      "@media": `(prefers-color-scheme: light)`,
    },
    dark: { "@media": `(prefers-color-scheme: dark)` },
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
  },
  defaultCondition: [`light`, `dark`],
  properties: {
    color: colors,
    backgroundColor: colors,
    borderColor: colors,
  },
});

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

const responsiveProperties = defineProperties({
  conditions: transformBreakpoints<{ mobile: {}; tablet: {}; desktop: {} }>(
    breakpoints
  ),
  defaultCondition: `mobile`,
  responsiveArray: [`mobile`, `tablet`, `desktop`],
  properties: {
    alignItems: [...flexAlignmentCommon, "baseline"],
    alignSelf: [...flexAlignmentCommon, "baseline"],
    borderWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderTopWidth: borderWidth,
    borderRadius: radii,
    borderBottomLeftRadius: radii,
    borderBottomRightRadius: radii,
    borderTopLeftRadius: radii,
    borderTopRightRadius: radii,
    bottom: space,
    display: ["block", "flex", "grid", "inline-block", "none", "contents"],
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
    },
    flexBasis: space,
    flexDirection: ["column", "row"],
    flexWrap: ["wrap", "nowrap"],
    fontSize: {
      ...fontSize,
      inherit: "inherit",
    },
    fontWeight: fontWeight,
    gap: space,
    height: space,
    inset: space,
    justifyContent: [...flexAlignmentCommon, "space-around", "space-between"],
    justifySelf: flexAlignmentCommon,
    left: space,
    letterSpacing: letterSpacing,
    lineHeight: lineHeight,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxHeight: space,
    maxWidth: {
      ...space,
      ...extendedSpace,
      none: "none",
    },
    width: {
      ...space,
      ...extendedSpace,
    },
    minHeight: space,
    minWidth: space,
    overflow: ["auto", "hidden", "scroll", "unset"],
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    paddingTop: space,
    position: ["absolute", "fixed", "relative", "sticky"],
    right: space,
    textAlign: ["center", "left", "right"],
    top: space,
  },
  shorthands: {
    borderLeftRadius: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    borderRightRadius: ["borderBottomRightRadius", "borderTopRightRadius"],
    borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
    borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    p: [`paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`],
    px: [`paddingLeft`, `paddingRight`],
    py: [`paddingTop`, `paddingBottom`],
    m: [`marginTop`, `marginBottom`, `marginLeft`, `marginRight`],
    mx: [`marginLeft`, `marginRight`],
    my: [`marginTop`, `marginBottom`],
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];

export type OptionalResponsiveObject<Value> =
  | Value
  | Partial<Record<Breakpoint, Value>>;

export type RequiredResponsiveObject<Value> = Partial<
  Record<Breakpoint, Value>
> &
  Record<(typeof breakpointNames)[0], Value>;
