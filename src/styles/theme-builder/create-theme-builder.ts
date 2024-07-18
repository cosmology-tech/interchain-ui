import { setElementVars } from "@vanilla-extract/dynamic";
import { themeContractTemplate, themeVars } from "../themes.css";
import { slotVars } from "./slot-vars.css";
import { ThemeVariant } from "../../models/system.model";

type StringifyValues<T> = {
  [K in keyof T]: T[K] extends object ? StringifyValues<T[K]> : string;
};
type ThemeContractValues = StringifyValues<typeof themeContractTemplate>;
type SlotThemes = Partial<typeof slotVars>;

export type Palettes = ThemeContractValues["palettes"];
export type BaseTokens = Omit<ThemeContractValues, "palettes" | "slotThemes">;

type ByThemeVariant<T> = {
  [key in ThemeVariant]: Partial<T>;
};

export type VarsApplier = (element: HTMLElement) => void;

export interface ResultThemeVars {
  light: VarsApplier;
  dark: VarsApplier;
}

class ThemeBuilder {
  private _palettes: ByThemeVariant<Partial<Palettes>> = {
    light: {},
    dark: {},
  };
  private _baseTokens: ByThemeVariant<Partial<BaseTokens>> = {
    light: {},
    dark: {},
  };
  private _slotThemes: ByThemeVariant<SlotThemes> = { light: {}, dark: {} };

  addBaseTokens(theme: ThemeVariant, tokens: Partial<BaseTokens>): this {
    this._baseTokens[theme] = { ...this._baseTokens[theme], ...tokens };
    return this;
  }

  addPalettes(theme: ThemeVariant, palettes: Partial<Palettes>): this {
    this._palettes[theme] = { ...this._palettes[theme], ...palettes };
    return this;
  }

  addSlotThemes(theme: ThemeVariant, slotThemes: SlotThemes): this {
    this._slotThemes[theme] = { ...this._slotThemes[theme], ...slotThemes };
    return this;
  }

  private isPartiallySet(obj: ByThemeVariant<Partial<any>>): boolean {
    return (
      Object.keys(obj.light).length > 0 || Object.keys(obj.dark).length > 0
    );
  }

  private validateThemePair<T>(
    lightTheme: Partial<T>,
    darkTheme: Partial<T>,
    name: string,
  ): void {
    const lightKeys = Object.keys(lightTheme);
    const darkKeys = Object.keys(darkTheme);

    if (lightKeys.length > 0 && darkKeys.length === 0) {
      throw new Error(`${name} are set for light theme but not for dark theme`);
    }

    if (darkKeys.length > 0 && lightKeys.length === 0) {
      throw new Error(`${name} are set for dark theme but not for light theme`);
    }
  }

  buildTheme(theme: ThemeVariant): VarsApplier {
    this.validateThemePair(
      this._palettes.light,
      this._palettes.dark,
      "Palettes",
    );
    this.validateThemePair(
      this._baseTokens.light,
      this._baseTokens.dark,
      "Base tokens",
    );
    this.validateThemePair(
      this._slotThemes.light,
      this._slotThemes.dark,
      "Slot themes",
    );

    const baseTokens = this._baseTokens[theme];
    const palettes = this._palettes[theme];
    const slotThemes = this._slotThemes[theme];

    const themeOverrides = {
      ...baseTokens,
      palettes,
    };

    const partialOverrides = partialThemeOverride(themeVars, themeOverrides);

    const slotThemesOverrides = {};

    // Override slot vars, only when they are set
    if (Object.keys(slotThemes).length > 0) {
      for (const slot in slotThemes) {
        const slotTheme = slotThemes[slot];
        const isCSSVarExists = slot in slotVars;

        if (isCSSVarExists) {
          const cssVar = slotVars[slot];
          slotThemesOverrides[cssVar] = slotTheme;
        }
      }
    }

    return (element: HTMLElement) => {
      setElementVars(element, {
        ...partialOverrides,
        ...slotThemesOverrides,
      });
    };
  }

  build(): ResultThemeVars {
    if (
      this.isPartiallySet(this._palettes) &&
      !this.isPartiallySet(this._baseTokens)
    ) {
      throw new Error("Base tokens must be set if palettes are set");
    }

    if (
      this.isPartiallySet(this._baseTokens) &&
      !this.isPartiallySet(this._palettes)
    ) {
      throw new Error("Palettes must be set if base tokens are set");
    }

    const lightTheme = this.buildTheme("light");
    const darkTheme = this.buildTheme("dark");

    return {
      light: lightTheme,
      dark: darkTheme,
    };
  }
}

export function createThemes(): ThemeBuilder {
  return new ThemeBuilder();
}

// Using any due to CSSVarFunction is not exported anymore from vanilla-extract
// so we can't use it in the type definition
function partialThemeOverride(themeVars: any, overrides: any): any {
  const result: any = {};

  for (const key in overrides) {
    if (key in themeVars) {
      const themeValue = themeVars[key];
      const overrideValue = overrides[key];

      if (
        typeof themeValue === "object" &&
        themeValue !== null &&
        typeof overrideValue === "object" &&
        overrideValue !== null
      ) {
        result[key] = partialThemeOverride(themeValue, overrideValue);
      } else if (overrideValue !== undefined) {
        result[key] = overrideValue;
      }
    }
  }

  return result;
}
