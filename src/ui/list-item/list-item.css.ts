import {
  createVar,
  fallbackVar,
  style,
  ComplexStyleRule,
} from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { ThemeVariant } from "../../models/system.model";
import { themeVars } from "../../styles/themes.css";
import { baseLightPalettes, baseDarkPalettes } from "../../styles/tokens";

import {
  listItemIntents,
  listItemSizes,
  ListItemIntent,
  ListItemIntentProperty,
  ListItemIntentScheme,
  ListItemSizeScheme,
  ListItemSizeProperty,
  ListItemVarKeys,
} from "./list-item.vars.css";
import { slotVars } from "../../styles/theme-builder/slot-vars.css";

import { ListItemSize } from "./list-item.types";
import { baseTextStyles } from "../text/text.css";

export const listItemBgVar = createVar();
export const listItemTextColorVar = createVar();
export const listItemBorderRadiusVar = createVar();

const defaultIntentScheme: ListItemIntentScheme = {
  none: {
    // Default
    textColor: themeVars.colors.text,
    bgColor: themeVars.colors.background,
    borderRadius: "6px",
    // Hover
    hoverTextColor: themeVars.colors.text,
    hoverBgColor: themeVars.palettes.neutral200,
    hoverBorderRadius: "6px",
    // Active
    activeTextColor: themeVars.colors.text,
    activeBgColor: baseLightPalettes.primary300,
    activeBorderRadius: "6px",
    // Selected
    selectedTextColor: themeVars.colors.text,
    selectedBgColor: baseLightPalettes.primary400,
    selectedBorderRadius: "6px",
    // Disabled
    disabledTextColor: themeVars.colors.textMuted,
    disabledBgColor: themeVars.colors.background,
    disabledBorderRadius: "6px",
    disabledOpacity: "0.95",
  },
};

const defaultIntentSchemeDark: ListItemIntentScheme = {
  none: {
    // Default
    textColor: themeVars.colors.text,
    bgColor: themeVars.colors.background,
    borderRadius: "6px",
    // Hover
    hoverTextColor: themeVars.colors.text,
    hoverBgColor: themeVars.palettes.neutral900,
    hoverBorderRadius: "6px",
    // Active
    activeTextColor: themeVars.colors.text,
    activeBgColor: baseDarkPalettes.primary300,
    activeBorderRadius: "6px",
    // Selected
    selectedTextColor: themeVars.colors.text,
    selectedBgColor: baseDarkPalettes.primary300,
    selectedBorderRadius: "6px",
    // Disabled
    disabledTextColor: themeVars.colors.textMuted,
    disabledBgColor: themeVars.colors.background,
    disabledBorderRadius: "6px",
    disabledOpacity: "0.95",
  },
};

export const listItemBase = style([
  baseTextStyles,
  {
    boxSizing: "border-box",
    listStyle: "none",
    cursor: "pointer",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
    color: listItemTextColorVar,
    borderRadius: listItemBorderRadiusVar,
    backgroundColor: listItemBgVar,
    opacity: "1",
  },
]);

const defaultSizeScheme: ListItemSizeScheme = {
  sm: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[5],
    paddingY: themeVars.space[5],
    height: "44px",
    minWidth: "0px",
  },
  md: {
    fontSize: themeVars.fontSize.sm,
    fontWeight: themeVars.fontWeight.normal,
    paddingX: themeVars.space[6],
    paddingY: themeVars.space[6],
    height: themeVars.space[17],
    minWidth: "0px",
  },
};

export const listItem = recipe({
  base: listItemBase,
  variants: {
    intent: listItemIntents.reduce(
      (acc, intent) => {
        acc[intent] = {};
        return acc;
      },
      {} as Record<ListItemIntent, ComplexStyleRule>,
    ),
    size: listItemSizes.reduce(
      (acc, size) => {
        const getValue = (property: ListItemSizeProperty) => {
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
      {} as Record<ListItemSize, ComplexStyleRule>,
    ),
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: genCompoundVariants({
    intents: listItemIntents,
    themes: ["light", "dark"],
  }),
  defaultVariants: {
    intent: "none",
    size: "sm",
    theme: "light",
  },
});

function genCompoundVariants({
  intents,
  themes,
}: {
  intents: ListItemIntent[];
  themes: ThemeVariant[];
}) {
  const getStyles = (
    intent: ListItemIntent,
    theme: ThemeVariant,
  ): ComplexStyleRule => {
    const varGetter = ({
      intent,
      size,
      property,
    }: {
      intent?: ListItemIntent;
      size?: ListItemSize;
      property: ListItemIntentProperty | ListItemSizeProperty;
    }) => {
      return getVarFromTheme({ intent, size, property, theme });
    };

    return {
      vars: {
        [listItemBgVar]: varGetter({ intent, property: "bgColor" }),
        [listItemTextColorVar]: varGetter({ intent, property: "textColor" }),
        [listItemBorderRadiusVar]: varGetter({
          intent,
          property: "borderRadius",
        }),
      },
      selectors: {
        "&:hover": {
          vars: {
            [listItemBgVar]: varGetter({ intent, property: "hoverBgColor" }),
            [listItemTextColorVar]: varGetter({
              intent,
              property: "hoverTextColor",
            }),
            [listItemBorderRadiusVar]: varGetter({
              intent,
              property: "hoverBorderRadius",
            }),
          },
        },
        '&[data-is-active="true"]': {
          vars: {
            [listItemBgVar]: varGetter({ intent, property: "activeBgColor" }),
            [listItemTextColorVar]: varGetter({
              intent,
              property: "activeTextColor",
            }),
            [listItemBorderRadiusVar]: varGetter({
              intent,
              property: "activeBorderRadius",
            }),
          },
        },
        '&[data-is-selected="true"]': {
          vars: {
            [listItemBgVar]: varGetter({ intent, property: "selectedBgColor" }),
            [listItemTextColorVar]: varGetter({
              intent,
              property: "selectedTextColor",
            }),
            [listItemBorderRadiusVar]: varGetter({
              intent,
              property: "selectedBorderRadius",
            }),
          },
        },
        '&[data-is-disabled="true"]': {
          opacity: varGetter({ intent, property: "disabledOpacity" }),
          vars: {
            [listItemBgVar]: varGetter({ intent, property: "disabledBgColor" }),
            [listItemTextColorVar]: varGetter({
              intent,
              property: "disabledTextColor",
            }),
            [listItemBorderRadiusVar]: varGetter({
              intent,
              property: "disabledBorderRadius",
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
  intent: ListItemIntent,
  property: ListItemIntentProperty,
) {
  return `ListItem-${intent}-${property}` satisfies ListItemVarKeys;
}

function getSizeStyleKey(size: ListItemSize, property: ListItemSizeProperty) {
  return `ListItem-${size}-${property}` satisfies ListItemVarKeys;
}

function getVarFromTheme({
  intent,
  size,
  property,
  theme,
}: {
  intent?: ListItemIntent;
  size?: ListItemSize;
  property: ListItemIntentProperty | ListItemSizeProperty;
  theme: ThemeVariant;
}) {
  if (intent) {
    const varKey = getIntentStyleKey(
      intent,
      property as ListItemIntentProperty,
    );

    const fallbackIntentScheme =
      theme === "light" ? defaultIntentScheme : defaultIntentSchemeDark;

    return fallbackVar(
      slotVars[varKey],
      fallbackIntentScheme[intent][property as ListItemIntentProperty],
    );
  }

  if (size) {
    const varKey = getSizeStyleKey(size, property as ListItemSizeProperty);

    return fallbackVar(
      slotVars[varKey],
      defaultSizeScheme[size][property as ListItemSizeProperty],
    );
  }

  return "";
}
