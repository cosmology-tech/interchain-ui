import { assignInlineVars } from "@vanilla-extract/dynamic";
import { buttonOverrides } from "../../ui/button/button.helper";
import type {
  OverridableProp,
  OverrideValue,
  ComponentOverrideMap,
  ComponentOverrideSchema,
  OverridableComponents,
} from "./override.types";
import type { ThemeVariant } from "../../models/system.model";

// Must manually add the overrides schema to this object for every component that you want users
// to be able to override styles
const overrideSchemas: Record<OverridableComponents, ComponentOverrideSchema> =
  {
    button: buttonOverrides,
  };

export class OverrideStyleManager {
  _overrideMap: ComponentOverrideMap;
  _theme: ThemeVariant;

  constructor(theme: ThemeVariant) {
    this._overrideMap = {};
    this._theme = theme;
  }

  update(overrideMap: ComponentOverrideMap | null, theme: ThemeVariant | null) {
    if (overrideMap) {
      this._overrideMap = overrideMap;
    }
    if (theme) {
      this._theme = theme;
    }
  }

  applyOverrides(component: OverridableComponents) {
    const schema = overrideSchemas[component];
    const componentOverrideValue = this._overrideMap[component] ?? {};
    const configByTheme = groupByTheme(componentOverrideValue);

    if (!schema || !configByTheme) {
      return {};
    }

    const config = configByTheme[this._theme];
    const varsMap: Record<string, string> = {};

    // Get the actual css value for each css var
    for (const [vanillaCssVar, propertyName] of schema.overrides) {
      const propertyValue = config[propertyName];

      if (!propertyValue) {
        continue;
      }

      varsMap[`${vanillaCssVar}`] = propertyValue;
    }

    return assignInlineVars(varsMap);
  }
}

// Transform config object
// From:
// { bg: { light: 'red500', dark: 'blue400' },
//   color: { light: 'yellow200', dark: 'gray400'}
// }
// To: {
//   light: { bg: 'red500', color: 'yellow200' },
//   dark: { bg: 'blue400', color: 'gray400' }
// }

function groupByTheme(config: OverrideValue) {
  if (!config) return null;

  const result: Record<
    ThemeVariant,
    Partial<Record<OverridableProp, string>>
  > = {
    light: {},
    dark: {},
  };

  for (const [overrideProperty, propertyConfig] of Object.entries(config)) {
    for (const theme of ["light", "dark"] as ThemeVariant[]) {
      result[theme] = {
        ...result[theme],
        [overrideProperty]: propertyConfig[theme],
      };
    }
  }

  return result;
}
