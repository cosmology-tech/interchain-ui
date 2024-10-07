import { ThemeDef } from "@interchain-ui/react";

export const CustomTheme = {
  light: "cosmology-light",
  dark: "cosmology-dark",
} as const;

export const lightTheme: ThemeDef = {
  name: CustomTheme.light,
  vars: {
    colors: {
      white: "#fff",
      blackAlpha50: "#4A5159",
      blackAlpha100: "#282c34",
      primary100: "#7310FF",
      primary200: "#453558",
      background: "#fff",
      purple100: "#7310FF",
      purple200: "#5F14C9",
      purple300: "#F9F4FF",
      purple400: "#AB6FFF",
      purple900: "#322F3C",
      gray50: "#F5F9FF",
      gray100: "#E1E9F0",
      gray200: "#acadaf",
      gray300: "#EDF2F7",
      gray400: "#CBD5E0",
      gray500: "#343A42",
      gray600: "#E3EAEF",
      cardBg: "#F5F7FB",
      text: "#2C3137",
      textSecondary: "#697584",
      skeletonBg: `#DDE4ED`,
      inputBorder: "#D1D6DD",
    },
  },
};

export const darkTheme: ThemeDef = {
  name: CustomTheme.dark,
  vars: {
    colors: {
      white: "#fff",
      blackAlpha50: "#4A5159",
      blackAlpha100: "#282c34",
      primary100: "#d5b7ff",
      primary200: "#c7c2cd",
      background: "#2C3137",
      purple100: "#7310FF",
      purple200: "#5F14C9",
      purple300: "#F9F4FF",
      purple400: "#AB6FFF",
      purple900: "#322F3C",
      gray50: "#1D2024",
      gray100: "#49525E",
      gray200: "#697584",
      gray300: "#404752",
      gray400: "#404752",
      gray500: "#343A42",
      gray600: "#4A5159",
      cardBg: "#1D2024",
      text: "#EEF2F8",
      textSecondary: "#A7B4C2",
      skeletonBg: `#3B434D`,
      inputBorder: "#434B55",
    },
  },
};
