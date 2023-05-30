import Big from "big.js";
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
  try {
    return new Intl.NumberFormat(locale, options);
  } catch {
    if (options?.style === "currency" && options?.currency) {
      const rootFormatter = new Intl.NumberFormat(
        locale,
        Object.assign({}, options, { currency: "BTC" })
      );

      return {
        format: (x: number | bigint | undefined) =>
          rootFormatter
            .formatToParts(x)
            .map((part) =>
              part.type === "currency" ? options.currency : part.value
            )
            .join(""),
        formatToParts: (x: number | bigint | undefined) =>
          rootFormatter.formatToParts(x).map((part) =>
            part.type === "currency"
              ? (Object.assign({}, part, {
                  value: options.currency,
                }) as Intl.NumberFormatPart)
              : part
          ),
        resolvedOptions: rootFormatter.resolvedOptions,
      } as Intl.NumberFormat;
    }

    return getNoOpFormatter(locale, options);
  }
}

export function safelyFormatNumberWithFallback(
  formatter: Intl.NumberFormat,
  value: Big
): string {
  // First, attempt to format the Big as a number primitive
  try {
    return formatter.format(value.toNumber());
  } catch {}

  // Second, attempt to format the Big as a string primitive
  try {
    return formatter.format(value.toString());
  } catch {}

  // As a fallback, simply return the ugly string value
  return value.toString();
}
