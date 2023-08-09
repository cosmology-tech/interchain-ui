import BigNumber from "bignumber.js";
import { store } from "../models/store";
function getNoOpFormatter(
  // locale: string = "default",
  locale: string,
  options?: Intl.NumberFormatOptions
) {
  return {
    format: (x: number | bigint | undefined) => x?.toString() || "",
    formatToParts: (x: number | bigint | undefined) => [
      {
        type: "unknown" as Intl.NumberFormatPartTypes,
        value: x?.toString() || "",
      },
    ],
    resolvedOptions: new Intl.NumberFormat(locale, options).resolvedOptions,
  } as Intl.NumberFormat;
}

export function getCurrencyFormatter(
  // locale: string = "default",
  locale: string,
  options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, options);
}

export function safelyFormatNumberWithFallback(
  formatter: Intl.NumberFormat,
  value: BigNumber
): string {
  // First, attempt to format the BigNumber as a number primitive
  try {
    return formatter.format(value.toNumber());
  } catch {}

  // As a fallback, simply return the ugly string value
  return value.toString();
}

/**
 * Function for lamp value
 * @param min
 * @param max
 * @param value
 * @returns
 */
export function clampBigNumber(
  min: string | number,
  max: string | number,
  value: string,
): string {
  if (value === "") {
    return "";
  }
  if (new BigNumber(value).gt(max)) {
    return new BigNumber(max).toString();
  }
  if (new BigNumber(value).lt(min)) {
    return new BigNumber(min).toString();
  }
  return value?.toString();
}
