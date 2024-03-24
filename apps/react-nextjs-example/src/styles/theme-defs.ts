import { ThemeDef } from "@interchain-ui/react";

export const CustomTheme = {
  light: "cosmology-light",
  dark: "cosmology-dark",
} as const;

export const cosmologyLightTheme: ThemeDef = {
  name: CustomTheme.light,
  vars: {
    colors: {
      background: "#fff",
      inputBg: "#f5f5f5",
    },
  },
};

export const cosmologyDarkTheme: ThemeDef = {
  name: CustomTheme.dark,
  vars: {
    colors: {
      background: "#2C3137",
    },
  },
};
