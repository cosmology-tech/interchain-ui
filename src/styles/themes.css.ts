import { createThemeContract, createTheme } from "@vanilla-extract/css";

const SYSTEM_FONT_STACK = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const colors = {
  black: `#000`,
  white: `#fff`,
  gray50: `#f9fafb`,
  gray100: `#f3f4f6`,
  gray200: `#e5e7eb`,
  gray300: `#d1d5db`,
  gray400: `#9ca3af`,
  gray500: `#6b7280`,
  gray600: `#4b5563`,
  gray700: `#374151`,
  gray800: `#1f2937`,
  gray900: `#111827`,
  red50: `#fef2f2`,
  red100: `#fee2e2`,
  red200: `#fecaca`,
  red300: `#fca5a5`,
  red400: `#f87171`,
  red500: `#ef4444`,
  red600: `#dc2626`,
  red700: `#b91c1c`,
  red800: `#991b1b`,
  red900: `#7f1d1d`,
  green50: `#f0fdf4`,
  green100: `#dcfce7`,
  green200: `#bbf7d0`,
  green300: `#86efac`,
  green400: `#4ade80`,
  green500: `#22c55e`,
  green600: `#16a34a`,
  green700: `#15803d`,
  green800: `#166534`,
  green900: `#14532d`,
  blue50: `#eff6ff`,
  blue100: `#dbeafe`,
  blue200: `#bfdbfe`,
  blue300: `#93c5fd`,
  blue400: `#60a5fa`,
  blue500: `#3b82f6`,
  blue600: `#2563eb`,
  blue700: `#1d4ed8`,
  blue800: `#1e40af`,
  blue900: `#1e3a8a`,
};

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
};

export const vars = createThemeContract({
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
  fontSize: {
    xs: ``,
    sm: ``,
    md: ``,
    lg: ``,
    xl: ``,
  },
  space: {
    xs: ``,
    sm: ``,
    md: ``,
    lg: ``,
    xl: ``,
  },
  boxShadow: {
    sm: ``,
    md: ``,
    lg: ``,
  },
  radii: {
    sm: ``,
    md: ``,
    full: ``,
  },
});

const commonVars = {
  font: {
    body: SYSTEM_FONT_STACK,
  },
  space: {
    xs: `0.25rem`,
    sm: `0.5rem`,
    md: `1rem`,
    lg: `1.5rem`,
    xl: `2.5rem`,
  },
  fontSize: {
    xs: `0.8rem`,
    sm: `0.875rem`,
    md: `1rem`,
    lg: `1.25rem`,
    xl: `1.5rem`,
  },
  boxShadow: {
    sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
    md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
    lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
  },
  radii: {
    sm: `0.2rem`,
    md: `0.4rem`,
    full: `100%`,
  },
};

export const lightThemeClass = createTheme(vars, {
  ...commonVars,
  colors: {
    primary: colors.blue500,
    body: colors.gray700,
    background: colors.gray100,
    link: colors.blue800,
    linkHover: colors.blue600,
    ...colors,
  },
});

export const darkThemeClass = createTheme(vars, {
  ...commonVars,
  colors: {
    primary: colors.blue400,
    body: colors.gray300,
    background: colors.gray800,
    link: colors.blue200,
    linkHover: colors.blue400,
    ...colors,
  },
});
