import {
  style,
  createVar,
  fallbackVar,
  ComplexStyleRule,
} from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import {
  TooltipVariant,
  TooltipVarKeys,
  TooltipVariantScheme,
  TooltipVariantProperty,
} from "./tooltip.vars.css";
import { slotVars } from "../../styles/theme-builder/slot-vars.css";

const tooltipBgColorVar = createVar();

const defaultVariantScheme: TooltipVariantScheme = {
  default: {
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    boxShadow: `0px 0px 20px 0px ${themeVars.palettes.neutral200}`,
    borderRadius: themeVars.radii["md"],
  },
};

const defaultVariantSchemeDark: TooltipVariantScheme = {
  default: {
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    boxShadow: `0px 0px 20px 0px ${themeVars.palettes.neutral900}`,
    borderRadius: themeVars.radii["md"],
  },
};

const getVariantStyleKey = (
  variant: TooltipVariant,
  property: TooltipVariantProperty,
) => {
  return `Tooltip-${variant}-${property}` satisfies TooltipVarKeys;
};

const getVarFromTheme = ({
  variant,
  property,
  theme,
}: {
  variant?: TooltipVariant;
  property: TooltipVariantProperty;
  theme: ThemeVariant;
}) => {
  if (variant) {
    const fallbackVariantScheme =
      theme === "light" ? defaultVariantScheme : defaultVariantSchemeDark;

    const varKey = getVariantStyleKey(
      variant,
      property as TooltipVariantProperty,
    );

    return fallbackVar(
      slotVars[varKey],
      fallbackVariantScheme[variant][property as TooltipVariantProperty],
    );
  }

  return "";
};

export const tooltip = recipe({
  base: style({}),
  variants: {
    variant: {
      default: {},
    },
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genCompountVariants({
    variants: ["default"],
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    variant: "default",
    theme: "light",
  },
});

function genCompountVariants({
  variants,
  themes,
}: {
  variants: TooltipVariant[];
  themes: ThemeVariant[];
}) {
  const getStyles = (theme: ThemeVariant): ComplexStyleRule => {
    const varGetter = ({
      variant,
      property,
    }: {
      variant?: TooltipVariant;
      property: TooltipVariantProperty;
    }) => {
      return getVarFromTheme({ variant, property, theme });
    };

    return {
      vars: {
        [tooltipBgColorVar]: varGetter({
          variant: "default",
          property: "bgColor",
        }),
      },
      backgroundColor: varGetter({ variant: "default", property: "bgColor" }),
      color: varGetter({ variant: "default", property: "textColor" }),
      boxShadow: varGetter({ variant: "default", property: "boxShadow" }),
      borderRadius: varGetter({ variant: "default", property: "borderRadius" }),
      width: "max-content",
      zIndex: 1,
      paddingTop: themeVars.space["3"],
      paddingBottom: themeVars.space["3"],
      paddingLeft: themeVars.space["3"],
      paddingRight: themeVars.space["3"],
      position: "absolute",
      display: "none",
      left: 0,
      top: 0,
      selectors: {
        '&[data-is-open="true"]': {
          display: "block",
        },
      },
    };
  };

  return variants.flatMap((variant) =>
    themes.map((theme) => ({
      variants: { variant, theme },
      style: getStyles(theme),
    })),
  );
}

export const tooltipArrow = style({
  backgroundColor: tooltipBgColorVar,
  position: "absolute",
  transform: "rotate(45deg)",
  width: themeVars.space["5"],
  height: themeVars.space["5"],
});
