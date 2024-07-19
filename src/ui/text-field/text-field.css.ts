import {
  createVar,
  fallbackVar,
  style,
  ComplexStyleRule,
} from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import { TextFieldIntent, TextFieldSize } from "./text-field.types";
import {
  textFieldSizes,
  textFieldIntents,
  TextFieldIntentScheme,
  TextFieldSizeScheme,
  TextFieldIntentProperty,
  TextFieldSizeProperty,
  TextFieldVarKeys,
} from "./text-field.vars.css";
import { slotVars } from "../../styles/theme-builder/slot-vars.css";

import { unstyledButton } from "../button/button.css";

export const inputBgVar = createVar();
export const inputTextColorVar = createVar();
export const inputBorderColorVar = createVar();
export const inputBorderWidthVar = createVar();
export const inputBorderRadiusVar = createVar();
export const inputPlaceholderColorVar = createVar();
export const inputBoxShadowVar = createVar();
export const inputOpacityVar = createVar();

// Manage z-index values
export const zIndexConfig = {
  rootInput: 0,
  borderElement: 1,
  input: 2,
  inputAddon: 3,
};

const defaultIntentScheme: TextFieldIntentScheme = {
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
    hoverBgColor: themeVars.colors.background,
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

const defaultIntentSchemeDark: TextFieldIntentScheme = {
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
    hoverBgColor: themeVars.colors.background,
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

const defaultSizeScheme: TextFieldSizeScheme = {
  sm: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[6],
    paddingY: themeVars.space[4],
    height: themeVars.space[14],
    minWidth: "0px",
  },
  md: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[10],
    paddingY: themeVars.space[8],
    height: "70px",
    minWidth: "0px",
  },
};

export const rootInput = style({
  position: "relative",
  display: "flex",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  backgroundColor: inputBgVar,
  color: inputTextColorVar,
  borderRadius: inputBorderRadiusVar,
  zIndex: zIndexConfig.rootInput,
  selectors: {
    "&:focus": {
      outline: "none", // Remove default focus outline
    },
  },
});

export const input = style({
  fontFamily: "inherit",
  color: "inherit",
  backgroundColor: inputBgVar,
  borderRadius: inputBorderRadiusVar,
  borderColor: "transparent",
  borderWidth: "1px",
  flex: "1",
  outline: "none",
  position: "relative",
  appearance: "none",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  zIndex: zIndexConfig.input,
  selectors: {
    [`${rootInput} &`]: {
      padding: "0",
      border: "none",
      borderRadius: "0",
      boxShadow: "none",
      opacity: "1",
      width: "100%",
      height: "100%",
    },
    "&::placeholder": {
      color: inputPlaceholderColorVar,
    },
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
  },
});

export const borderFocusedLight = getInputIntentFocusedStyles("light");
export const borderFocusedDark = getInputIntentFocusedStyles("dark");

export const borderElement = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  borderColor: "transparent",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: inputBorderRadiusVar,
  boxShadow: `0 0 0 ${inputBorderWidthVar} ${inputBorderColorVar}`,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  zIndex: zIndexConfig.borderElement,
  selectors: {
    [`${input}[data-intent='none'][data-theme='light']:focus-within + &`]:
      borderFocusedLight,
    [`${input}[data-intent='none'][data-theme='dark']:focus-within + &`]:
      borderFocusedDark,
  },
});

export const clearIcon = style({
  color: "inherit",
  fontSize: themeVars.fontSize.lg,
});

export const clearButton = style([
  unstyledButton,
  style({
    padding: 0,
  }),
]);

export const textField = recipe({
  base: rootInput,
  variants: {
    intent: textFieldIntents.reduce(
      (acc, intent) => {
        acc[intent] = {};
        return acc;
      },
      {} as Record<TextFieldIntent, any>,
    ),
    size: textFieldSizes.reduce(
      (acc, size) => {
        const getValue = (property: TextFieldSizeProperty) => {
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
          height: getValue("height"),
          minWidth: getValue("minWidth"),
        };

        return acc;
      },
      {} as Record<TextFieldSize, any>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genCompoundVariants({
    intents: textFieldIntents,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    intent: "none",
    size: "sm",
    theme: "light",
  },
});

export type TextFieldVariants = RecipeVariants<typeof textField>;

function genCompoundVariants({
  intents,
  themes,
}: {
  intents: TextFieldIntent[];
  themes: ThemeVariant[];
}) {
  const getStyles = (
    intent: TextFieldIntent,
    theme: ThemeVariant,
  ): ComplexStyleRule => {
    const varGetter = ({
      intent,
      size,
      property,
    }: {
      intent?: TextFieldIntent;
      size?: TextFieldSize;
      property: TextFieldIntentProperty | TextFieldSizeProperty;
    }) => {
      return getVarFromTheme({ intent, size, property, theme });
    };

    return {
      vars: {
        [inputBgVar]: varGetter({ intent, property: "bgColor" }),
        [inputTextColorVar]: varGetter({ intent, property: "textColor" }),
        [inputBorderColorVar]: varGetter({ intent, property: "borderColor" }),
        [inputBorderWidthVar]: varGetter({ intent, property: "borderWidth" }),
        [inputBorderRadiusVar]: varGetter({ intent, property: "borderRadius" }),
        [inputPlaceholderColorVar]: varGetter({
          intent,
          property: "placeholderColor",
        }),
        [inputBoxShadowVar]: varGetter({ intent, property: "boxShadow" }),
        [inputOpacityVar]: varGetter({ intent, property: "opacity" }),
      },
      selectors: {
        "&:hover": {
          vars: {
            [inputBgVar]: varGetter({ intent, property: "hoverBgColor" }),
            [inputTextColorVar]: varGetter({
              intent,
              property: "hoverTextColor",
            }),
            [inputBorderColorVar]: varGetter({
              intent,
              property: "hoverBorderColor",
            }),
            [inputBorderWidthVar]: varGetter({
              intent,
              property: "hoverBorderWidth",
            }),
            [inputBorderRadiusVar]: varGetter({
              intent,
              property: "hoverBorderRadius",
            }),
            [inputPlaceholderColorVar]: varGetter({
              intent,
              property: "hoverPlaceholderColor",
            }),
            [inputBoxShadowVar]: varGetter({
              intent,
              property: "hoverBoxShadow",
            }),
            [inputOpacityVar]: varGetter({ intent, property: "hoverOpacity" }),
          },
        },
        '&[data-state="focused"]': {
          vars: {
            [inputBgVar]: varGetter({ intent, property: "focusedBgColor" }),
            [inputTextColorVar]: varGetter({
              intent,
              property: "focusedTextColor",
            }),
            [inputBorderColorVar]: varGetter({
              intent,
              property: "focusedBorderColor",
            }),
            [inputBorderWidthVar]: varGetter({
              intent,
              property: "focusedBorderWidth",
            }),
            [inputBorderRadiusVar]: varGetter({
              intent,
              property: "focusedBorderRadius",
            }),
            [inputPlaceholderColorVar]: varGetter({
              intent,
              property: "focusedPlaceholderColor",
            }),
            [inputBoxShadowVar]: varGetter({
              intent,
              property: "focusedBoxShadow",
            }),
            [inputOpacityVar]: varGetter({
              intent,
              property: "focusedOpacity",
            }),
          },
        },
        '&[data-state="disabled"]': {
          vars: {
            [inputBgVar]: varGetter({ intent, property: "disabledBgColor" }),
            [inputTextColorVar]: varGetter({
              intent,
              property: "disabledTextColor",
            }),
            [inputBorderColorVar]: varGetter({
              intent,
              property: "disabledBorderColor",
            }),
            [inputBorderWidthVar]: varGetter({
              intent,
              property: "disabledBorderWidth",
            }),
            [inputBorderRadiusVar]: varGetter({
              intent,
              property: "disabledBorderRadius",
            }),
            [inputPlaceholderColorVar]: varGetter({
              intent,
              property: "disabledPlaceholderColor",
            }),
            [inputBoxShadowVar]: varGetter({
              intent,
              property: "disabledBoxShadow",
            }),
            [inputOpacityVar]: varGetter({
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
  intent: TextFieldIntent,
  property: TextFieldIntentProperty,
) {
  return `TextField-${intent}-${property}` satisfies TextFieldVarKeys;
}

function getSizeStyleKey(size: TextFieldSize, property: TextFieldSizeProperty) {
  return `TextField-${size}-${property}` satisfies TextFieldVarKeys;
}

function getVarFromTheme({
  intent,
  size,
  property,
  theme,
}: {
  intent?: TextFieldIntent;
  size?: TextFieldSize;
  property: TextFieldIntentProperty | TextFieldSizeProperty;
  theme: ThemeVariant;
}) {
  if (intent) {
    const varKey = getIntentStyleKey(
      intent,
      property as TextFieldIntentProperty,
    );

    const fallbackIntentScheme =
      theme === "light" ? defaultIntentScheme : defaultIntentSchemeDark;

    return fallbackVar(
      slotVars[varKey],
      fallbackIntentScheme[intent][property as TextFieldIntentProperty],
    );
  }

  if (size) {
    const varKey = getSizeStyleKey(size, property as TextFieldSizeProperty);

    return fallbackVar(
      slotVars[varKey],
      defaultSizeScheme[size][property as TextFieldSizeProperty],
    );
  }

  return "";
}

function getInputIntentFocusedStyles(theme: ThemeVariant) {
  return {
    vars: {
      [inputBgVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedBgColor",
      }),
      [inputTextColorVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedTextColor",
      }),
      [inputBorderColorVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedBorderColor",
      }),
      [inputBorderWidthVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedBorderWidth",
      }),
      [inputBorderRadiusVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedBorderRadius",
      }),
      [inputPlaceholderColorVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedPlaceholderColor",
      }),
      [inputBoxShadowVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedBoxShadow",
      }),
      [inputOpacityVar]: getVarFromTheme({
        intent: "none",
        theme: theme,
        property: "focusedOpacity",
      }),
    },
  };
}
