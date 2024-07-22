import {
  createVar,
  fallbackVar,
  style,
  ComplexStyleRule,
} from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import { SelectButtonIntent, SelectButtonSize } from "./select-button.types";
import {
  selectButtonSizes,
  selectButtonIntents,
  SelectButtonIntentScheme,
  SelectButtonSizeScheme,
  SelectButtonIntentProperty,
  SelectButtonSizeProperty,
  SelectButtonVarKeys,
} from "./select-button.vars.css";
import { slotVars } from "../../styles/theme-builder/slot-vars.css";
import { unstyledButton } from "../button/button.css";

export const selectButtonBgVar = createVar();
export const selectButtonTextColorVar = createVar();
export const selectButtonBorderColorVar = createVar();
export const selectButtonBorderWidthVar = createVar();
export const selectButtonBorderRadiusVar = createVar();
export const selectButtonPlaceholderColorVar = createVar();
export const selectButtonBoxShadowVar = createVar();
export const selectButtonOpacityVar = createVar();

export const selectButtonHeightVar = createVar();
export const selectButtonPaddingXVar = createVar();
export const selectButtonPaddingYVar = createVar();
export const selectButtonDividerColorVar = createVar();

// Manage z-index values
export const zIndexConfig = {
  rootInput: 0,
  borderElement: 1,
  input: 2,
  inputAddon: 3,
};

export const arrowDropDown = style({
  fontSize: themeVars.fontSize["3xl"],
  color: themeVars.colors.textPlaceholder,
});

export const buttonContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
});

const defaultIntentScheme: SelectButtonIntentScheme = {
  none: {
    // Default state
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.neutral300,
    borderWidth: themeVars.borderWidth.sm,
    borderRadius: themeVars.radii.base,
    placeholderColor: themeVars.colors.textMuted,
    boxShadow: "none",
    opacity: "1",
    // Hover state
    hoverBgColor: themeVars.palettes.neutral200,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.neutral300,
    hoverBorderWidth: themeVars.borderWidth.base,
    hoverBorderRadius: themeVars.radii.base,
    hoverPlaceholderColor: themeVars.colors.textMuted,
    hoverBoxShadow: "none",
    hoverOpacity: "1",
    // Focused state
    focusedBgColor: themeVars.colors.background,
    focusedTextColor: themeVars.colors.text,
    focusedBorderColor: themeVars.palettes.primary500,
    focusedBorderWidth: themeVars.borderWidth.base,
    focusedBorderRadius: themeVars.radii.base,
    focusedPlaceholderColor: themeVars.colors.textMuted,
    focusedBoxShadow: "none",
    focusedOpacity: "1",
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral200,
    disabledTextColor: themeVars.colors.textMuted,
    disabledBorderColor: themeVars.palettes.neutral300,
    disabledBorderWidth: themeVars.borderWidth.sm,
    disabledBorderRadius: themeVars.radii.base,
    disabledPlaceholderColor: themeVars.colors.textMuted,
    disabledBoxShadow: "none",
    disabledOpacity: "1",
  },
  error: {
    // Default state
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.error600,
    borderWidth: themeVars.borderWidth.base,
    borderRadius: themeVars.radii.base,
    placeholderColor: themeVars.colors.textMuted,
    boxShadow: "none",
    opacity: "1",
    // Hover state
    hoverBgColor: themeVars.colors.background,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.error500,
    hoverBorderWidth: themeVars.borderWidth.base,
    hoverBorderRadius: themeVars.radii.base,
    hoverPlaceholderColor: themeVars.colors.textMuted,
    hoverBoxShadow: "none",
    hoverOpacity: "1",
    // Focused state
    focusedBgColor: themeVars.colors.background,
    focusedTextColor: themeVars.colors.text,
    focusedBorderColor: themeVars.palettes.error600,
    focusedBorderWidth: themeVars.borderWidth.base,
    focusedBorderRadius: themeVars.radii.base,
    focusedPlaceholderColor: themeVars.colors.textMuted,
    focusedBoxShadow: "none",
    focusedOpacity: "1",
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral200,
    disabledTextColor: themeVars.colors.textMuted,
    disabledBorderColor: themeVars.palettes.neutral300,
    disabledBorderWidth: themeVars.borderWidth.sm,
    disabledBorderRadius: themeVars.radii.base,
    disabledPlaceholderColor: themeVars.colors.textMuted,
    disabledBoxShadow: "none",
    disabledOpacity: "1",
  },
};

const defaultIntentSchemeDark: SelectButtonIntentScheme = {
  none: {
    // Default state
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.neutral800,
    borderWidth: themeVars.borderWidth.sm,
    borderRadius: themeVars.radii.base,
    placeholderColor: themeVars.colors.textMuted,
    boxShadow: "none",
    opacity: "1",
    // Hover state
    hoverBgColor: themeVars.palettes.neutral900,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.neutral900,
    hoverBorderWidth: themeVars.borderWidth.base,
    hoverBorderRadius: themeVars.radii.base,
    hoverPlaceholderColor: themeVars.colors.textMuted,
    hoverBoxShadow: "none",
    hoverOpacity: "1",
    // Focused state
    focusedBgColor: themeVars.colors.background,
    focusedTextColor: themeVars.colors.text,
    focusedBorderColor: themeVars.palettes.primary500,
    focusedBorderWidth: themeVars.borderWidth.base,
    focusedBorderRadius: themeVars.radii.base,
    focusedPlaceholderColor: themeVars.colors.textMuted,
    focusedBoxShadow: "none",
    focusedOpacity: "1",
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral800,
    disabledTextColor: themeVars.palettes.neutral700,
    disabledBorderColor: themeVars.palettes.neutral300,
    disabledBorderWidth: themeVars.borderWidth.sm,
    disabledBorderRadius: themeVars.radii.base,
    disabledPlaceholderColor: themeVars.palettes.neutral700,
    disabledBoxShadow: "none",
    disabledOpacity: "1",
  },
  error: {
    // Default state
    bgColor: themeVars.colors.background,
    textColor: themeVars.colors.text,
    borderColor: themeVars.palettes.error600,
    borderWidth: themeVars.borderWidth.base,
    borderRadius: themeVars.radii.base,
    placeholderColor: themeVars.colors.textMuted,
    boxShadow: "none",
    opacity: "1",
    // Hover state
    hoverBgColor: themeVars.colors.background,
    hoverTextColor: themeVars.colors.text,
    hoverBorderColor: themeVars.palettes.error500,
    hoverBorderWidth: themeVars.borderWidth.base,
    hoverBorderRadius: themeVars.radii.base,
    hoverPlaceholderColor: themeVars.colors.textMuted,
    hoverBoxShadow: "none",
    hoverOpacity: "1",
    // Focused state
    focusedBgColor: themeVars.colors.background,
    focusedTextColor: themeVars.colors.text,
    focusedBorderColor: themeVars.palettes.error600,
    focusedBorderWidth: themeVars.borderWidth.base,
    focusedBorderRadius: themeVars.radii.base,
    focusedPlaceholderColor: themeVars.colors.textMuted,
    focusedBoxShadow: "none",
    focusedOpacity: "1",
    // Disabled state
    disabledBgColor: themeVars.palettes.neutral200,
    disabledTextColor: themeVars.colors.textMuted,
    disabledBorderColor: themeVars.palettes.neutral300,
    disabledBorderWidth: themeVars.borderWidth.sm,
    disabledBorderRadius: themeVars.radii.base,
    disabledPlaceholderColor: themeVars.colors.textMuted,
    disabledBoxShadow: "none",
    disabledOpacity: "1",
  },
};

const defaultSizeScheme: SelectButtonSizeScheme = {
  sm: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[5],
    paddingY: themeVars.space[4],
    height: themeVars.space[14],
    minWidth: "0px",
  },
  md: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[5],
    paddingY: themeVars.space[4],
    height: "70px",
    minWidth: "0px",
  },
};

export const cursor = style({
  cursor: "pointer",
});

export const button = style([
  unstyledButton,
  cursor,
  style({
    fontFamily: "inherit",
    color: "inherit",
    backgroundColor: selectButtonBgVar,
    borderRadius: selectButtonBorderRadiusVar,
    borderColor: selectButtonBorderColorVar,
    borderStyle: "solid",
    borderWidth: "1px",
    flex: "1",
    outline: "none",
    position: "relative",
    appearance: "none",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
    zIndex: zIndexConfig.input,
    fontSize: themeVars.fontSize.sm,
    width: "100%",
    fontWeight: themeVars.fontWeight.normal,
    selectors: {
      "&:focus": {
        boxShadow: "none",
      },
    },
  }),
]);

export const buttonRoot = style({
  fontFamily: themeVars.font.body,
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  backgroundColor: selectButtonBgVar,
  color: selectButtonTextColorVar,
  borderRadius: selectButtonBorderRadiusVar,
  zIndex: zIndexConfig.rootInput,
  selectors: {
    "&:focus": {
      outline: "none", // Remove default focus outline
    },
  },
});

export const selectButton = recipe({
  base: button,
  variants: {
    intent: selectButtonIntents.reduce(
      (acc, intent) => {
        acc[intent] = {};
        return acc;
      },
      {} as Record<SelectButtonIntent, ComplexStyleRule>,
    ),
    size: selectButtonSizes.reduce(
      (acc, size) => {
        const getValue = (property: SelectButtonSizeProperty) => {
          return fallbackVar(
            slotVars[getSizeStyleKey(size, property)],
            defaultSizeScheme[size][property],
          );
        };

        acc[size] = {
          fontSize: getValue("fontSize"),
          fontWeight: getValue("fontWeight"),
          paddingLeft: getValue("paddingX"),
          paddingRight: getValue("paddingX"),
          paddingTop: getValue("paddingY"),
          paddingBottom: getValue("paddingY"),
          minWidth: getValue("minWidth"),
          height: getValue("height"),
          vars: {
            [selectButtonHeightVar]: getValue("height"),
            [selectButtonPaddingXVar]: getValue("paddingX"),
            [selectButtonPaddingYVar]: getValue("paddingY"),
          },
        };

        return acc;
      },
      {} as Record<SelectButtonSize, ComplexStyleRule>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genCompoundVariants({
    intents: selectButtonIntents,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    intent: "none",
    size: "sm",
    theme: "light",
  },
});

export type SelectButtonVariants = RecipeVariants<typeof selectButton>;

function genCompoundVariants({
  intents,
  themes,
}: {
  intents: SelectButtonIntent[];
  themes: ThemeVariant[];
}) {
  const getStyles = (
    intent: SelectButtonIntent,
    theme: ThemeVariant,
  ): ComplexStyleRule => {
    const varGetter = ({
      intent,
      size,
      property,
    }: {
      intent?: SelectButtonIntent;
      size?: SelectButtonSize;
      property: SelectButtonIntentProperty | SelectButtonSizeProperty;
    }) => {
      return getVarFromTheme({ intent, size, property, theme });
    };

    return {
      vars: {
        [selectButtonBgVar]: varGetter({ intent, property: "bgColor" }),
        [selectButtonTextColorVar]: varGetter({
          intent,
          property: "textColor",
        }),
        [selectButtonBorderColorVar]: varGetter({
          intent,
          property: "borderColor",
        }),
        [selectButtonBorderWidthVar]: varGetter({
          intent,
          property: "borderWidth",
        }),
        [selectButtonBorderRadiusVar]: varGetter({
          intent,
          property: "borderRadius",
        }),
        [selectButtonPlaceholderColorVar]: varGetter({
          intent,
          property: "placeholderColor",
        }),
        [selectButtonBoxShadowVar]: varGetter({
          intent,
          property: "boxShadow",
        }),
        [selectButtonOpacityVar]: varGetter({ intent, property: "opacity" }),
        [selectButtonDividerColorVar]: varGetter({
          intent,
          property: "borderColor",
        }),
      },
      selectors: {
        "&:hover": {
          vars: {
            [selectButtonBgVar]: varGetter({
              intent,
              property: "hoverBgColor",
            }),
            [selectButtonTextColorVar]: varGetter({
              intent,
              property: "hoverTextColor",
            }),
            [selectButtonBorderColorVar]: varGetter({
              intent,
              property: "hoverBorderColor",
            }),
            [selectButtonBorderWidthVar]: varGetter({
              intent,
              property: "hoverBorderWidth",
            }),
            [selectButtonBorderRadiusVar]: varGetter({
              intent,
              property: "hoverBorderRadius",
            }),
            [selectButtonPlaceholderColorVar]: varGetter({
              intent,
              property: "hoverPlaceholderColor",
            }),
            [selectButtonBoxShadowVar]: varGetter({
              intent,
              property: "hoverBoxShadow",
            }),
            [selectButtonOpacityVar]: varGetter({
              intent,
              property: "hoverOpacity",
            }),
          },
        },
        "&:focus, &:focus-within": {
          vars: {
            [selectButtonBgVar]: varGetter({
              intent,
              property: "focusedBgColor",
            }),
            [selectButtonTextColorVar]: varGetter({
              intent,
              property: "focusedTextColor",
            }),
            [selectButtonBorderColorVar]: varGetter({
              intent,
              property: "focusedBorderColor",
            }),
            [selectButtonBorderWidthVar]: varGetter({
              intent,
              property: "focusedBorderWidth",
            }),
            [selectButtonBorderRadiusVar]: varGetter({
              intent,
              property: "focusedBorderRadius",
            }),
            [selectButtonPlaceholderColorVar]: varGetter({
              intent,
              property: "focusedPlaceholderColor",
            }),
            [selectButtonBoxShadowVar]: varGetter({
              intent,
              property: "focusedBoxShadow",
            }),
            [selectButtonOpacityVar]: varGetter({
              intent,
              property: "focusedOpacity",
            }),
          },
        },
        '&[data-active="true"]': {
          vars: {
            [selectButtonBgVar]: varGetter({
              intent,
              property: "focusedBgColor",
            }),
            [selectButtonTextColorVar]: varGetter({
              intent,
              property: "focusedTextColor",
            }),
            [selectButtonBorderColorVar]: varGetter({
              intent,
              property: "focusedBorderColor",
            }),
            [selectButtonBorderWidthVar]: varGetter({
              intent,
              property: "focusedBorderWidth",
            }),
            [selectButtonBorderRadiusVar]: varGetter({
              intent,
              property: "focusedBorderRadius",
            }),
            [selectButtonPlaceholderColorVar]: varGetter({
              intent,
              property: "focusedPlaceholderColor",
            }),
            [selectButtonBoxShadowVar]: varGetter({
              intent,
              property: "focusedBoxShadow",
            }),
            [selectButtonOpacityVar]: varGetter({
              intent,
              property: "focusedOpacity",
            }),
          },
        },
        "&:disabled": {
          vars: {
            [selectButtonBgVar]: varGetter({
              intent,
              property: "disabledBgColor",
            }),
            [selectButtonTextColorVar]: varGetter({
              intent,
              property: "disabledTextColor",
            }),
            [selectButtonBorderColorVar]: varGetter({
              intent,
              property: "disabledBorderColor",
            }),
            [selectButtonBorderWidthVar]: varGetter({
              intent,
              property: "disabledBorderWidth",
            }),
            [selectButtonBorderRadiusVar]: varGetter({
              intent,
              property: "disabledBorderRadius",
            }),
            [selectButtonPlaceholderColorVar]: varGetter({
              intent,
              property: "disabledPlaceholderColor",
            }),
            [selectButtonBoxShadowVar]: varGetter({
              intent,
              property: "disabledBoxShadow",
            }),
            [selectButtonOpacityVar]: varGetter({
              intent,
              property: "disabledOpacity",
            }),
          },
        },
      },
    };
  };

  return intents.flatMap((intent) =>
    themes.map((theme) => ({
      variants: { intent, theme },
      style: getStyles(intent, theme),
    })),
  );
}

// ==== Helpers ====
function getIntentStyleKey(
  intent: SelectButtonIntent,
  property: SelectButtonIntentProperty,
) {
  return `SelectButton-${intent}-${property}` satisfies SelectButtonVarKeys;
}

function getSizeStyleKey(
  size: SelectButtonSize,
  property: SelectButtonSizeProperty,
) {
  return `SelectButton-${size}-${property}` satisfies SelectButtonVarKeys;
}

function getVarFromTheme({
  intent,
  size,
  property,
  theme,
}: {
  intent?: SelectButtonIntent;
  size?: SelectButtonSize;
  property: SelectButtonIntentProperty | SelectButtonSizeProperty;
  theme: ThemeVariant;
}) {
  if (intent) {
    const varKey = getIntentStyleKey(
      intent,
      property as SelectButtonIntentProperty,
    );

    const fallbackIntentScheme =
      theme === "light" ? defaultIntentScheme : defaultIntentSchemeDark;

    return fallbackVar(
      slotVars[varKey],
      fallbackIntentScheme[intent][property as SelectButtonIntentProperty],
    );
  }

  if (size) {
    const varKey = getSizeStyleKey(size, property as SelectButtonSizeProperty);

    return fallbackVar(
      slotVars[varKey],
      defaultSizeScheme[size][property as SelectButtonSizeProperty],
    );
  }

  return "";
}
