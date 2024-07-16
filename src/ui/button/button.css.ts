import { style, createVar, ComplexStyleRule } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import {
  ButtonIntent,
  ButtonVariant,
  ButtonSize,
} from "../../ui/button/button.types";
import {
  buttonVariants,
  buttonIntents,
  ButtonColorScheme,
  ButtonVariantScheme,
  ButtonSizeScheme,
  ButtonIntentProperty,
  ButtonVariantProperty,
  ButtonSizeProperty,
  ButtonVarKeys,
  buttonSizes,
} from "./button.vars";

export const buttonBgVar = createVar();
export const buttonTextColorVar = createVar();
export const buttonBorderColorVar = createVar();

export const baseButton = style({
  fontFamily: "inherit",
  cursor: "pointer",
  appearance: "none",
  border: "none",
  outline: "none",
  textDecoration: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  transition: "all 200ms ease",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
});

export const unstyledButton = style([
  baseButton,
  {
    background: "transparent",
    color: "inherit",
  },
]);

const defaultVariantScheme: ButtonVariantScheme = {
  primary: {
    // Default state
    bgColor: themeVars.palettes.primary500,
    textColor: themeVars.colors.textInverse,
    borderColor: themeVars.palettes.primary500,
    borderStyle: "solid",
    borderRadius: themeVars.radii.base,
    borderWidth: themeVars.borderWidth.sm,
    // Hover state
    hoverBgColor: themeVars.palettes.primary400,
    hoverTextColor: themeVars.colors.textInverse,
    hoverBorderColor: themeVars.palettes.primary400,
    hoverBorderRadius: themeVars.radii.base,
    hoverBorderWidth: themeVars.borderWidth.sm,
    // Active state
    activeBgColor:
      "linear-gradient(90.00deg, rgb(104, 199, 255),rgb(1, 161, 255) 100%)",
    activeTextColor: themeVars.colors.textInverse,
    activeBorderColor: "transparent",
    activeBorderRadius: themeVars.radii.base,
    activeBorderWidth: themeVars.borderWidth.sm,
    // Disabled state
    disabledBgColor: themeVars.palettes.primary400,
    disabledTextColor: themeVars.colors.textInverse,
    disabledBorderColor: themeVars.palettes.primary400,
    disabledBorderRadius: themeVars.radii.base,
    disabledBorderWidth: themeVars.borderWidth.sm,
  },
  secondary: {
    // Default state
    bgColor: themeVars.palettes.neutral300,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.neutral50,
    borderStyle: "solid",
    borderRadius: themeVars.radii.base,
    borderWidth: themeVars.borderWidth.sm,
    // Hover state
    hoverBgColor: themeVars.palettes.neutral300,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.neutral200,
    hoverBorderRadius: themeVars.radii.base,
    hoverBorderWidth: themeVars.borderWidth.base,
    // Active state
    activeTextColor: themeVars.colors.text,
    activeBgColor: "transparent",
    activeBorderColor: themeVars.palettes.neutral300,
    activeBorderRadius: themeVars.radii.base,
    activeBorderWidth: themeVars.borderWidth.sm,
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral300,
    disabledTextColor: themeVars.palettes.neutral300,
    disabledBorderColor: "transparent",
    disabledBorderRadius: themeVars.radii.base,
    disabledBorderWidth: themeVars.borderWidth.sm,
  },
  unstyled: {},
};

const defaultVariantSchemeDark: ButtonVariantScheme = {
  primary: {
    // Default state
    bgColor: themeVars.palettes.primary500,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.primary500,
    borderStyle: "solid",
    borderRadius: themeVars.radii.base,
    borderWidth: themeVars.borderWidth.sm,
    // Hover state
    hoverBgColor: themeVars.palettes.primary600,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.primary400,
    hoverBorderRadius: themeVars.radii.base,
    hoverBorderWidth: themeVars.borderWidth.sm,
    // Active state
    activeBgColor:
      "linear-gradient(90.00deg, rgb(104, 199, 255),rgb(1, 161, 255) 100%)",
    activeTextColor: themeVars.colors.text,
    activeBorderColor: "transparent",
    activeBorderRadius: themeVars.radii.base,
    activeBorderWidth: themeVars.borderWidth.sm,
    // Disabled state
    disabledBgColor: themeVars.palettes.primary300,
    disabledTextColor: themeVars.colors.text,
    disabledBorderColor: themeVars.palettes.primary400,
    disabledBorderRadius: themeVars.radii.base,
    disabledBorderWidth: themeVars.borderWidth.sm,
  },
  secondary: {
    // Default state
    bgColor: themeVars.palettes.neutral800,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.neutral950,
    borderStyle: "solid",
    borderRadius: themeVars.radii.base,
    borderWidth: themeVars.borderWidth.sm,
    // Hover state
    hoverBgColor: themeVars.palettes.neutral800,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.neutral900,
    hoverBorderRadius: themeVars.radii.base,
    hoverBorderWidth: themeVars.borderWidth.base,
    // Active state
    activeTextColor: themeVars.colors.text,
    activeBgColor: "transparent",
    activeBorderColor: themeVars.palettes.neutral950,
    activeBorderRadius: themeVars.radii.base,
    activeBorderWidth: themeVars.borderWidth.sm,
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral800,
    disabledTextColor: themeVars.palettes.neutral800,
    disabledBorderColor: themeVars.palettes.neutral950,
    disabledBorderRadius: themeVars.radii.base,
    disabledBorderWidth: themeVars.borderWidth.sm,
  },
  unstyled: {},
};

const defaultColorScheme: ButtonColorScheme = {
  none: {},
  success: {
    bgColor: themeVars.palettes.success600,
    textColor: themeVars.colors.textInverse,
    borderColor: themeVars.palettes.success600,
    // Hover state
    hoverBgColor: themeVars.palettes.success500,
    hoverTextColor: themeVars.colors.textInverse,
    hoverBorderColor: themeVars.palettes.success500,
    // Active state
    activeBgColor: themeVars.palettes.success800,
    activeTextColor: themeVars.colors.textInverse,
    activeBorderColor: themeVars.palettes.success800,
    // Disabled state
    disabledBgColor: themeVars.palettes.success300,
    disabledTextColor: themeVars.colors.textInverse,
    disabledBorderColor: themeVars.palettes.success300,
  },
  warning: {
    bgColor: themeVars.palettes.warning600,
    textColor: themeVars.colors.textInverse,
    borderColor: themeVars.palettes.warning600,
    // Hover state
    hoverBgColor: themeVars.palettes.warning500,
    hoverTextColor: themeVars.colors.textInverse,
    hoverBorderColor: themeVars.palettes.warning500,
    // Active state
    activeBgColor: themeVars.palettes.warning800,
    activeTextColor: themeVars.colors.textInverse,
    activeBorderColor: themeVars.palettes.warning800,
    // Disabled state
    disabledBgColor: themeVars.palettes.warning300,
    disabledTextColor: themeVars.colors.textInverse,
    disabledBorderColor: themeVars.palettes.warning300,
  },
  danger: {
    bgColor: themeVars.palettes.error600,
    textColor: themeVars.colors.textInverse,
    borderColor: themeVars.palettes.error600,
    // Hover state
    hoverBgColor: themeVars.palettes.error500,
    hoverTextColor: themeVars.colors.textInverse,
    hoverBorderColor: themeVars.palettes.error500,
    // Active state
    activeBgColor: themeVars.palettes.error800,
    activeTextColor: themeVars.colors.textInverse,
    activeBorderColor: themeVars.palettes.error800,
    // Disabled state
    disabledBgColor: themeVars.palettes.error300,
    disabledTextColor: themeVars.colors.textInverse,
    disabledBorderColor: themeVars.palettes.error300,
  },
};

const defaultSizeScheme: ButtonSizeScheme = {
  xs: {
    fontSize: themeVars.fontSize.xs,
    paddingX: themeVars.space["2"],
    paddingY: "0px",
    height: themeVars.space["9"],
    minWidth: themeVars.space["15"],
  },
  sm: {
    fontSize: themeVars.fontSize.xs,
    paddingX: themeVars.space["5"],
    paddingY: "0px",
    height: themeVars.space["13"],
    minWidth: themeVars.space["15"],
  },
  md: {
    fontSize: themeVars.fontSize.md,
    paddingX: themeVars.space["9"],
    paddingY: "0px",
    height: themeVars.space["14"],
    minWidth: themeVars.space["15"],
  },
  lg: {
    fontSize: themeVars.fontSize.lg,
    paddingX: themeVars.space["16"],
    paddingY: "0px",
    height: themeVars.space["15"],
    minWidth: themeVars.space["15"],
  },
};

const getVariantStyleKey = (
  variant: ButtonVariant,
  property: ButtonVariantProperty,
) => {
  return `button-${variant}-${property}` as ButtonVarKeys;
};

const getIntentStyleKey = (
  intent: ButtonIntent,
  property: ButtonIntentProperty,
) => {
  return `button-${intent}-${property}` as ButtonVarKeys;
};

const getSizeStyleKey = (size: ButtonSize, property: ButtonSizeProperty) => {
  return `button-${size}-${property}` as ButtonVarKeys;
};

const getVarFromTheme = ({
  variant,
  intent,
  size,
  property,
  theme,
}: {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  property: ButtonVariantProperty | ButtonIntentProperty | ButtonSizeProperty;
  theme: ThemeVariant;
}) => {
  if (variant) {
    const fallbackVariantScheme =
      theme === "light" ? defaultVariantScheme : defaultVariantSchemeDark;

    const varKey = getVariantStyleKey(
      variant,
      property as ButtonVariantProperty,
    );

    return (
      themeVars.slotThemes[varKey] ??
      fallbackVariantScheme[variant][property as ButtonVariantProperty]
    );
  }

  if (intent) {
    const varKey = getIntentStyleKey(intent, property as ButtonIntentProperty);

    return (
      themeVars.slotThemes[varKey] ??
      defaultColorScheme[intent][property as ButtonIntentProperty]
    );
  }

  if (size) {
    const varKey = getSizeStyleKey(size, property as ButtonSizeProperty);
    return (
      themeVars.slotThemes[varKey] ??
      defaultSizeScheme[size][property as ButtonSizeProperty]
    );
  }

  return "";
};

export const button = recipe({
  base: baseButton,
  variants: {
    variant: buttonVariants.reduce(
      (acc, variant) => {
        const getValue = (property: ButtonVariantProperty) => {
          return (
            themeVars.slotThemes[getVariantStyleKey(variant, property)] ??
            defaultVariantScheme[variant][property]
          );
        };

        acc[variant] = {
          borderStyle: getValue("borderStyle"),
          borderColor: getValue("borderColor"),
          borderWidth: getValue("borderWidth"),
          borderRadius: getValue("borderRadius"),
          boxShadow: getValue("boxShadow") ?? "none",
        };
        return acc;
      },
      {} as Record<ButtonVariant, any>,
    ),
    intent: buttonIntents.reduce(
      (acc, intent) => {
        acc[intent] = {};
        return acc;
      },
      {} as Record<ButtonIntent, any>,
    ),
    size: buttonSizes.reduce(
      (acc, size) => {
        const getValue = (property: ButtonSizeProperty) => {
          return (
            themeVars.slotThemes[getSizeStyleKey(size, property)] ??
            defaultSizeScheme[size][property]
          );
        };

        acc[size] = {
          fontSize: getValue("fontSize"),
          paddingLeft: getValue("paddingX"),
          paddingRight: getValue("paddingX"),
          paddingTop: getValue("paddingY"),
          paddingBottom: getValue("paddingY"),
          height: getValue("height"),
          minWidth: getValue("minWidth"),
        };

        return acc;
      },
      {} as Record<ButtonSize, any>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genCompoundVariants({
    variants: buttonVariants,
    intents: buttonIntents,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    variant: "primary",
    intent: "none",
    size: "md",
    theme: "light",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;

function genCompoundVariants({
  variants,
  intents,
  themes,
}: {
  variants: ButtonVariant[];
  intents: ButtonIntent[];
  themes: ThemeVariant[];
}) {
  const getStyles = (
    variant: ButtonVariant,
    intent: ButtonIntent,
    theme: ThemeVariant,
  ) => {
    const varGetter = ({
      variant,
      intent,
      size,
      property,
    }: {
      variant?: ButtonVariant;
      intent?: ButtonIntent;
      size?: ButtonSize;
      property:
        | ButtonVariantProperty
        | ButtonIntentProperty
        | ButtonSizeProperty;
    }) => {
      return getVarFromTheme({ variant, intent, size, property, theme });
    };

    if (variant === "primary") {
      if (intent === "none") {
        return {
          position: "relative",
          color: varGetter({ variant, property: "textColor" }),
          border: "none",
          boxShadow: varGetter({ variant, property: "boxShadow" }) ?? "none",
          selectors: {
            "&:hover": {
              color: varGetter({ variant, property: "hoverTextColor" }),
            },
            "&:active": {
              color: varGetter({ variant, property: "activeTextColor" }),
            },
            "&:disabled": {
              cursor: "not-allowed",
              color: varGetter({ variant, property: "disabledTextColor" }),
            },
            // Background, use pseudo element because gradients can't transition
            "&:before": {
              content: `""`,
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: varGetter({ variant, property: "bgColor" }),
              borderRadius: "inherit",
              transition: "opacity 200ms ease",
              opacity: 1,
              zIndex: 0,
            },
            "&:hover:before": {
              background: varGetter({
                variant,
                property: "hoverBgColor",
              }),
              opacity: 1,
            },
            "&:active:before": {
              background: varGetter({
                variant,
                property: "activeBgColor",
              }),
              opacity: 1,
            },
            "&:disabled:before": {
              background: varGetter({
                variant,
                property: "disabledBgColor",
              }),
              opacity: 1,
            },
          },
        } satisfies ComplexStyleRule;
      }

      // With intent color
      return {
        position: "relative",
        color: varGetter({ intent, property: "textColor" }),
        border: "none",
        boxShadow: varGetter({ variant, property: "boxShadow" }) ?? "none",
        selectors: {
          "&:hover": {
            color: varGetter({ intent, property: "hoverTextColor" }),
          },
          "&:active": {
            color: varGetter({ intent, property: "activeTextColor" }),
          },
          "&:disabled": {
            cursor: "not-allowed",
            color: varGetter({ intent, property: "disabledTextColor" }),
          },
          // Background, use pseudo element because gradients can't transition
          "&:before": {
            content: `""`,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: varGetter({ intent, property: "bgColor" }),
            borderRadius: "inherit",
            transition: "opacity 200ms ease",
            opacity: 1,
            zIndex: 0,
          },
          "&:hover:before": {
            background: varGetter({
              intent,
              property: "hoverBgColor",
            }),
            opacity: 1,
          },
          "&:active:before": {
            background: varGetter({
              intent,
              property: "activeBgColor",
            }),
            opacity: 1,
          },
          "&:disabled:before": {
            background: varGetter({
              intent,
              property: "disabledBgColor",
            }),
            opacity: 1,
          },
        },
      } satisfies ComplexStyleRule;
    }

    if (variant === "secondary") {
      return {
        color: themeVars.colors.text,
        borderWidth: varGetter({ variant, property: "borderWidth" }),
        borderStyle: varGetter({ variant, property: "borderStyle" }),
        borderColor: varGetter({ variant, property: "bgColor" }),
        boxShadow: varGetter({ variant, property: "boxShadow" }) ?? "none",
        borderRadius: varGetter({ variant, property: "borderRadius" }),
        background: varGetter({ variant, property: "borderColor" }),
        selectors: {
          "&:hover": {
            color: varGetter({ variant, property: "hoverTextColor" }),
            borderRadius: varGetter({ variant, property: "hoverBorderRadius" }),
            borderColor: varGetter({
              variant,
              property: "hoverBgColor",
            }),
            background: varGetter({
              variant,
              property: "hoverBorderColor",
            }),
          },
          "&:active": {
            color: varGetter({ variant, property: "activeTextColor" }),
            borderRadius: varGetter({
              variant,
              property: "activeBorderRadius",
            }),
            borderColor: varGetter({
              variant,
              property: "activeBgColor",
            }),
            background: varGetter({
              variant,
              property: "activeBorderColor",
            }),
          },
          "&:disabled": {
            cursor: "not-allowed",
            color: varGetter({ variant, property: "disabledTextColor" }),
            borderRadius: varGetter({
              variant,
              property: "disabledBorderRadius",
            }),
            borderColor: varGetter({
              variant,
              property: "disabledBgColor",
            }),
            background: varGetter({
              variant,
              property: "disabledBorderColor",
            }),
          },
        },
      } satisfies ComplexStyleRule;
    }

    return {};
  };

  return intents.flatMap((intent) =>
    variants.flatMap((variant) =>
      themes.map((theme) => ({
        variants: { variant, intent, theme },
        style: getStyles(variant, intent, theme),
      })),
    ),
  );
}

export const buttonContent = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});
