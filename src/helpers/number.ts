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
 * Make sure value not greater than avaliable
 * @param inputValue
 * @param available
 * @returns
 */
export function getValueByAvailable(
  inputValue: string | number,
  available: string | number
): string {
  if (inputValue === "") {
    return "";
  }
  if (new BigNumber(inputValue).gt(available)) {
    return new BigNumber(available).toString();
  }
  if (new BigNumber(inputValue).lt(0)) {
    return new BigNumber(0).toString();
  }
  return inputValue.toString();
}
