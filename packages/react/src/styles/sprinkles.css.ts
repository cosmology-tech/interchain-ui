import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { themeVars } from "./themes.css";
import { breakpoints } from "./tokens";

const { space, colors, fontSize, radii, boxShadow } = themeVars;

const unresponsiveProperties = defineProperties({
  properties: {
    fontSize,
    lineHeight: fontSize,
    textAlign: [`center`, `left`, `right`],
    textTransform: [`lowercase`, `uppercase`],
    fontWeight: [400, 500, 600, 700, 800],
    textDecoration: [`none`, `underline`],
    borderRadius: radii,
    boxShadow,
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
    background: colors,
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
  conditions: transformBreakpoints<{
    mobile: object;
    tablet: object;
    desktop: object;
  }>(breakpoints),
  defaultCondition: `mobile`,
  responsiveArray: [`mobile`, `tablet`, `desktop`],
  properties: {
    position: [`relative`],
    display: [`none`, `block`, `inline`, `inline-block`, `flex`],
    alignItems: [`flex-start`, `center`, `flex-end`, `baseline`],
    justifyContent: [`flex-start`, `center`, `flex-end`, `space-between`],
    flexDirection: [`row`, `row-reverse`, `column`, `column-reverse`],
    flexWrap: [`wrap`, `nowrap`],
    padding: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    margin: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
  },
  shorthands: {
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
