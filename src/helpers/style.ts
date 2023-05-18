import { setElementVars } from "@vanilla-extract/dynamic";
import deepmerge from "@fastify/deepmerge";
import {
  themeVars,
  lightSchemeClass,
  darkSchemeClass,
  commonVars,
} from "../styles/themes.css";

const merge = deepmerge({ all: true });

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

export const assignThemeVars = (
  customTheme: typeof themeVars,
  scheme: "light" | "dark"
) => {
  const lightSchemeElements = document.getElementsByClassName(lightSchemeClass);
  const darkSchemeElements = document.getElementsByClassName(darkSchemeClass);
  const schemeContainers =
    scheme === "light" ? lightSchemeElements : darkSchemeElements;

  for (let el of schemeContainers) {
    setElementVars(
      el as HTMLElement,
      themeVars,
      merge(commonVars, customTheme)
    );
  }
};
