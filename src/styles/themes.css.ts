import {
  createThemeContract,
  createTheme,
  globalFontFace,
} from "@vanilla-extract/css";
import {
  colors,
  SYSTEM_FONT_STACK,
  letterSpacing,
  lineHeight,
  fontSize,
  fontWeight,
  radii,
  borderStyle,
  borderWidth,
  space,
} from "./tokens";

const fontInterName = "Inter";

globalFontFace(fontInterName, {
  src: `url(https://fonts.googleapis.com/css?family=Inter)`,
  fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  fontStyle: `normal`,
  fontDisplay: `swap`,
});

export const boxShadow = {
  xs: `0 0 0 1px rgba(0, 0, 0, 0.05)`,
  sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
  base: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
  md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
  lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
  xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
  "2xl": `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
  inset: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
  primaryOutline: `0 0 0 2px ${colors.primary200}`,
  none: `none`,
  "dark-lg": `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
};

// Enforce a theme contract so that light/dark/xxx themes will have the same properties
export const themeVars = createThemeContract({
  colors: {
    primary: ``,
    body: ``,
    background: ``,
    link: ``,
    linkHover: ``,
    ...colors,
  },
  font: {
    body: ``,
  },
  space: {
    "0": ``,
    "1": ``,
    "2": ``,
    "3": ``,
    "4": ``,
    "5": ``,
    "6": ``,
    "7": ``,
    "8": ``,
    "9": ``,
    "10": ``,
    "11": ``,
    "12": ``,
    "13": ``,
    "14": ``,
    "15": ``,
    "16": ``,
    "17": ``,
    "18": ``,
    "19": ``,
    "20": ``,
    "21": ``,
    "22": ``,
    "23": ``,
    "24": ``,
    "25": ``,
    "26": ``,
    "27": ``,
    "28": ``,
    "29": ``,
    "30": ``,
    auto: ``,
    full: ``,
    fit: ``,
    max: ``,
    min: ``,
    viewHeight: ``,
    viewWidth: ``,
    none: ``,
  },
  borderWidth: {
    none: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
  },
  borderStyle: {
    none: ``,
    solid: ``,
    dotted: ``,
    dashed: ``,
    groove: ``,
    ridge: ``,
    hidden: ``,
    double: ``,
    inset: ``,
    outset: ``,
    unset: ``,
  },
  boxShadow: {
    xs: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    inset: ``,
    primaryOutline: ``,
    none: ``,
    "dark-lg": ``,
  },
  radii: {
    none: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    "3xl": ``,
    "4xl": ``,
    full: ``,
  },
  letterSpacing: {
    tighter: ``,
    tight: ``,
    normal: ``,
    wide: ``,
    wider: ``,
    widest: ``,
  },
  lineHeight: {
    normal: ``,
    none: ``,
    shorter: ``,
    short: ``,
    base: ``,
    tall: ``,
    taller: ``,
  },
  fontWeight: {
    hairline: ``,
    thin: ``,
    light: ``,
    normal: ``,
    medium: ``,
    semibold: ``,
    bold: ``,
    extrabold: ``,
    black: ``,
  },
  fontSize: {
    "3xs": ``,
    "2xs": ``,
    xs: ``,
    sm: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    "3xl": ``,
    "4xl": ``,
    "5xl": ``,
    "6xl": ``,
    "7xl": ``,
    "8xl": ``,
    "9xl": ``,
    "10xl": ``,
    "11xl": ``,
    "12xl": ``,
    "13xl": ``,
    "14xl": ``,
    "15xl": ``,
  },
});

export const commonVars = {
  font: {
    body: [fontInterName, SYSTEM_FONT_STACK].join(`, `),
  },
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
  boxShadow,
  radii,
  borderWidth,
  borderStyle,
};

// Note that lightSchemeClass and darkSchemeClass only means "vars in prefers-color-scheme: light/dark"
// Users can supply an array of theme vars and we can dynamically replace those values to match.
// For example:
// const customThemes = [
//   {
//     name: 'theme1',
//     tokens: {
//        // Providing 2 objects light and dark for each mode
//        light: {
//         ...
//        },
//        dark: {
//         ...
//        }
//      }
//   },
//   {
//     name: 'theme2',
//     tokens: {
//        // Or just 1 object for both light and dark mode, same as not caring about the prefers-color-scheme
//        ...<custom values>
//     }
//   }
// ]

export const lightSchemeClass = createTheme(themeVars, {
  ...commonVars,
  colors: {
    primary: colors.primary500,
    body: colors.gray800,
    background: colors.gray100,
    link: colors.blue800,
    linkHover: colors.blue600,
    ...colors,
  },
});

export const darkSchemeClass = createTheme(themeVars, {
  ...commonVars,
  colors: {
    primary: colors.primary400,
    body: colors.gray300,
    background: colors.gray800,
    link: colors.blue200,
    linkHover: colors.blue400,
    ...colors,
  },
});
