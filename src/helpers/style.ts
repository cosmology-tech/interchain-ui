import { assignInlineVars } from "@vanilla-extract/dynamic";
import deepmerge from "@fastify/deepmerge";
import { themeVars, commonVars } from "../styles/themes.css";

const merge = deepmerge({ all: true });

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

export const createCustomTheme = (customTheme: typeof themeVars) =>
  assignInlineVars(themeVars, merge(commonVars, customTheme));
