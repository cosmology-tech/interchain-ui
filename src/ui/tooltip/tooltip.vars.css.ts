import { createVar } from "@vanilla-extract/css";
import { StringifyValues } from "../../helpers/types";

export const tooltipVarPrefix = "Tooltip" as const;
export type TooltipVariant = "default";

export const tooltipVariants: TooltipVariant[] = ["default"];

const variantProps = {
  bgColor: "",
  textColor: "",
  boxShadow: "",
  borderRadius: "",
} as const;

export type TooltipVariantProperties = StringifyValues<typeof variantProps>;
export type TooltipVariantProperty = keyof TooltipVariantProperties;

export type TooltipVariantScheme = Partial<
  Record<TooltipVariant, Partial<TooltipVariantProperties>>
>;

export type TooltipVarKeys =
  `${typeof tooltipVarPrefix}-${TooltipVariant}-${TooltipVariantProperty}`;

export type TooltipVars = {
  [K in TooltipVarKeys]: string;
};

export function generateTooltipVars() {
  const vars = {} as TooltipVars;

  tooltipVariants.forEach((variant) => {
    Object.keys(variantProps).forEach((prop) => {
      const key =
        `Tooltip-${variant}-${prop as TooltipVariantProperty}` satisfies TooltipVarKeys;
      vars[key] = createVar();
    });
  });

  return vars;
}
