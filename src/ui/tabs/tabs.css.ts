import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import { TabSize, TabVariant } from "./tabs.types";
import {
  tabSizes,
  tabVariants,
  TabVariantScheme,
  TabSizeScheme,
  TabVariantProperty,
  TabSizeProperty,
  TabsVarKeys,
} from "./tabs.vars";

export const pillSelectionBgVar = createVar();
export const tabTextFontSizeVar = createVar();
export const tabTextFontWeightVar = createVar();
export const tabTextColorVar = createVar();
export const tabTextActiveColorVar = createVar();

const defaultVariantScheme: TabVariantScheme = {
  pill: {
    // Default state
    bgColor: themeVars.palettes.neutral200,
    textColor: themeVars.colors.text,
    // Hover state
    hoverBgColor: themeVars.palettes.primary400,
    hoverTextColor: themeVars.colors.text,
    // Active state
    activeBgColor: themeVars.palettes.primary500,
    activeTextColor: themeVars.colors.textInverse,
    // Disabled state
    disabledBgColor: themeVars.palettes.primary200,
    disabledTextColor: themeVars.colors.text,
  },
  line: {
    // Default state
    bgColor: "transparent",
    textColor: themeVars.colors.textSecondary,
    // Hover state
    hoverBgColor: "transparent",
    hoverTextColor: themeVars.colors.text,
    // Active state
    activeBgColor: "transparent",
    activeTextColor: themeVars.palettes.primary500,
    // Disabled state
    disabledBgColor: "transparent",
    disabledTextColor: themeVars.colors.text,
  },
};

const defaultVariantSchemeDark: TabVariantScheme = {
  pill: {
    // Default state
    bgColor: themeVars.palettes.neutral600,
    textColor: themeVars.colors.text,
    // Hover state
    hoverBgColor: themeVars.palettes.primary400,
    hoverTextColor: themeVars.colors.text,
    // Active state
    activeBgColor: themeVars.palettes.primary800,
    activeTextColor: themeVars.colors.textInverse,
    // Disabled state
    disabledBgColor: themeVars.palettes.primary200,
    disabledTextColor: themeVars.colors.text,
  },
  line: {
    // Default state
    bgColor: "transparent",
    textColor: themeVars.palettes.neutral600,
    // Hover state
    hoverBgColor: "transparent",
    hoverTextColor: themeVars.colors.text,
    // Active state
    activeBgColor: "transparent",
    activeTextColor: themeVars.palettes.primary500,
    // Disabled state
    disabledBgColor: "transparent",
    disabledTextColor: themeVars.colors.text,
  },
};

const defaultSizeScheme: TabSizeScheme = {
  sm: {
    fontSize: themeVars.fontSize.md,
    fontWeight: themeVars.fontWeight.medium,
    paddingX: "0px",
    paddingY: "0px",
    height: themeVars.space["12"],
    minWidth: themeVars.space["15"],
  },
  md: {
    fontSize: themeVars.fontSize["3xl"],
    fontWeight: themeVars.fontWeight.medium,
    paddingX: "0px",
    paddingY: "0px",
    height: themeVars.space["15"],
    minWidth: themeVars.space["15"],
  },
};

const getVariantStyleKey = (
  variant: TabVariant,
  property: TabVariantProperty,
) => {
  return `tabs-${variant}-${property}` satisfies TabsVarKeys;
};

const getSizeStyleKey = (size: TabSize, property: TabSizeProperty) => {
  return `tabs-${size}-${property}` satisfies TabsVarKeys;
};

const getVarFromTheme = ({
  variant,
  size,
  property,
  theme,
}: {
  variant?: TabVariant;
  size?: TabSize;
  property: TabVariantProperty | TabSizeProperty;
  theme: ThemeVariant;
}) => {
  if (variant) {
    const fallbackVariantScheme =
      theme === "light" ? defaultVariantScheme : defaultVariantSchemeDark;

    const varKey = getVariantStyleKey(variant, property as TabVariantProperty);

    return (
      themeVars.slotThemes[varKey] ??
      fallbackVariantScheme[variant][property as TabVariantProperty]
    );
  }

  if (size) {
    const varKey = getSizeStyleKey(size, property as TabSizeProperty);
    return (
      themeVars.slotThemes[varKey] ??
      defaultSizeScheme[size][property as TabSizeProperty]
    );
  }

  return "";
};

const tabsPillBase = style({
  listStyle: "none",
  display: "flex",
  borderRadius: "50px",
  flexDirection: "row",
});

export const tabsPill = recipe({
  base: tabsPillBase,
  variants: {
    size: tabSizes.reduce(
      (acc, size) => {
        const getValue = (property: TabSizeProperty) => {
          return (
            themeVars.slotThemes[getSizeStyleKey(size, property)] ??
            defaultSizeScheme[size][property]
          );
        };

        acc[size] = {
          fontSize: getValue("fontSize"),
          fontWeight: getValue("fontWeight"),
          paddingLeft: getValue("paddingX"),
          paddingRight: getValue("paddingX"),
          paddingTop: getValue("paddingY"),
          paddingBottom: getValue("paddingY"),
          height: getValue("height"),
          minWidth: getValue("minWidth"),
        };

        return acc;
      },
      {} as Record<TabSize, any>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genPillCompoundVariants({
    sizes: tabSizes,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    size: "md",
  },
});

function genPillCompoundVariants({
  sizes,
  themes,
}: {
  sizes: TabSize[];
  themes: ThemeVariant[];
}) {
  const getStyles = (size: TabSize, theme: ThemeVariant): ComplexStyleRule => {
    const varGetter = ({
      size,
      variant,
      property,
    }: {
      size?: TabSize;
      variant?: TabVariant;
      property: TabSizeProperty | TabVariantProperty;
    }) => {
      return getVarFromTheme({ variant, size, property, theme });
    };

    return {
      vars: {
        [pillSelectionBgVar]: getVarFromTheme({
          variant: "pill",
          property: "activeBgColor",
          theme,
        }),
        [tabTextColorVar]: getVarFromTheme({
          variant: "pill",
          property: "textColor",
          theme,
        }),
        [tabTextActiveColorVar]: getVarFromTheme({
          variant: "pill",
          property: "activeTextColor",
          theme,
        }),
        [tabTextFontSizeVar]: themeVars.fontSize.sm,
        [tabTextFontWeightVar]: varGetter({ size, property: "fontWeight" }),
      },
      fontSize: varGetter({ size, property: "fontSize" }),
      fontWeight: varGetter({ size, property: "fontWeight" }),
      paddingLeft: varGetter({ size, property: "paddingX" }),
      paddingRight: varGetter({ size, property: "paddingX" }),
      paddingTop: varGetter({ size, property: "paddingY" }),
      paddingBottom: varGetter({ size, property: "paddingY" }),
      height: varGetter({ size, property: "height" }),
      minWidth: varGetter({ size, property: "minWidth" }),
      // ====
      backgroundColor: varGetter({ variant: "pill", property: "bgColor" }),
      color: varGetter({ variant: "pill", property: "textColor" }),
    };
  };

  return sizes.flatMap((size) =>
    themes.map((theme) => ({
      variants: { size, theme },
      style: getStyles(size, theme),
    })),
  );
}

const tabsLineBase = style({
  listStyle: "none",
  display: "inline-flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "flex-start",
  gap: "30px",
});

export const tabsLine = recipe({
  base: tabsLineBase,
  variants: {
    size: tabSizes.reduce(
      (acc, size) => {
        const getValue = (property: TabSizeProperty) => {
          return (
            themeVars.slotThemes[getSizeStyleKey(size, property)] ??
            defaultSizeScheme[size][property]
          );
        };

        acc[size] = {
          fontSize: getValue("fontSize"),
          fontWeight: getValue("fontWeight"),
          paddingLeft: getValue("paddingX"),
          paddingRight: getValue("paddingX"),
          paddingTop: getValue("paddingY"),
          paddingBottom: getValue("paddingY"),
          height: getValue("height"),
        };

        return acc;
      },
      {} as Record<TabSize, any>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genLineCompoundVariants({
    sizes: tabSizes,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    size: "md",
  },
});

function genLineCompoundVariants({
  sizes,
  themes,
}: {
  sizes: TabSize[];
  themes: ThemeVariant[];
}) {
  const getStyles = (size: TabSize, theme: ThemeVariant): ComplexStyleRule => {
    const varGetter = ({
      size,
      variant,
      property,
    }: {
      size?: TabSize;
      variant?: TabVariant;
      property: TabSizeProperty | TabVariantProperty;
    }) => {
      return getVarFromTheme({ variant, size, property, theme });
    };

    return {
      vars: {
        [pillSelectionBgVar]: getVarFromTheme({
          variant: "line",
          property: "activeBgColor",
          theme,
        }),
        [tabTextColorVar]: getVarFromTheme({
          variant: "line",
          property: "textColor",
          theme,
        }),
        [tabTextActiveColorVar]: getVarFromTheme({
          variant: "line",
          property: "activeTextColor",
          theme,
        }),
        [tabTextFontSizeVar]: themeVars.fontSize.sm,
        [tabTextFontWeightVar]: varGetter({ size, property: "fontWeight" }),
      },
      fontSize: varGetter({ size, property: "fontSize" }),
      fontWeight: varGetter({ size, property: "fontWeight" }),
      paddingLeft: varGetter({ size, property: "paddingX" }),
      paddingRight: varGetter({ size, property: "paddingX" }),
      paddingTop: varGetter({ size, property: "paddingY" }),
      paddingBottom: varGetter({ size, property: "paddingY" }),
      height: varGetter({ size, property: "height" }),
      // ====
      backgroundColor: "transparent",
      color: varGetter({ variant: "line", property: "textColor" }),
    };
  };

  return sizes.flatMap((size) =>
    themes.map((theme) => ({
      variants: { size, theme },
      style: getStyles(size, theme),
    })),
  );
}

export const tabButtonPill = style({
  all: "unset",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "50px",
  display: "inline-block",
  height: "100%",
  width: "100%",
  color: tabTextColorVar,
  fontSize: tabTextFontSizeVar,
  fontWeight: tabTextFontWeightVar,
  selectors: {
    '&[data-active="true"]': {
      color: tabTextActiveColorVar,
    },
  },
});

export const tabButtonLine = style({
  all: "unset",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "50px",
  display: "inline-block",
  height: "100%",
  width: "fit-content",
  flexShrink: "0",
  flexGrow: "0",
  color: tabTextColorVar,
  fontSize: tabTextFontSizeVar,
  fontWeight: tabTextFontWeightVar,
  position: "relative",
  selectors: {
    "&:before": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "2px",
      backgroundColor: "transparent",
      transition: "background-color 150ms",
    },
    '&[data-active="true"]:before': {
      backgroundColor: tabTextActiveColorVar,
    },
    '&[data-active="true"]': {
      color: tabTextActiveColorVar,
    },
  },
});

export const tabButtonContent = style({
  display: "inline-block",
  color: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
});

export const tabSelection = style({
  zIndex: -1,
  height: "100%",
  position: "absolute",
  left: 0,
  borderRadius: "50px",
  willChange: `transform, width`,
  transition: `transform 150ms, width 100ms`,
  backgroundColor: pillSelectionBgVar,
});
