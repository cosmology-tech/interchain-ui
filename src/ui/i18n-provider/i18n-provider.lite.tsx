import {
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import Big from "big.js";
import {
  getCurrencyFormatter,
  safelyFormatNumberWithFallback,
} from "../../helpers/number";
import { store } from "../../models/store";
import { I18nProviderProps } from "./i18n-provider.types";
import { NumberFormatProps } from "../../models/system.model";

export default function I18nProvider(props: I18nProviderProps) {
  console.log(props);
  let numberFormatterRef = useRef<Intl.NumberFormat>(null);
  let formatNumberFnRef = useRef<(NumberFormatProps) => string>(null);
  let initialCurrencyConfigRef = useRef({
    currency: props.currency,
    currencySign: props.currencySign,
    useGrouping: props.useGrouping,
    minimumIntegerDigits: props.minimumIntegerDigits,
    minimumFractionDigits: props.minimumFractionDigits,
    maximumFractionDigits: props.maximumFractionDigits,
    minimumSignificantDigits: props.minimumSignificantDigits,
    maximumSignificantDigits: props.maximumSignificantDigits,
  });
  // const formatNumber = (value: number): string => {
  //   return safelyFormatNumberWithFallback(numberFormatterRef, value);
  // };

  // const numberFormatter: Intl.NumberFormat = getCurrencyFormatter(
  //   props.locale,
  //   {
  //     currency: props.currency,
  //     currencySign: props.currencySign,
  //     useGrouping: props.useGrouping,
  //     minimumIntegerDigits: props.minimumIntegerDigits,
  //     minimumFractionDigits: props.minimumFractionDigits,
  //     maximumFractionDigits: props.maximumFractionDigits,
  //     minimumSignificantDigits: props.minimumSignificantDigits,
  //     maximumSignificantDigits: props.maximumSignificantDigits,
  //   }
  // );

  onMount(() => {
    numberFormatterRef = getCurrencyFormatter(
      props.locale,
      initialCurrencyConfigRef
    );
    formatNumberFnRef = (subProps: NumberFormatProps): string => {
      numberFormatterRef = getCurrencyFormatter(
        props.locale,
        Object.assign(initialCurrencyConfigRef, { style: subProps.style })
      );
      return safelyFormatNumberWithFallback(
        numberFormatterRef,
        new Big(subProps.value)
      );
    };
    store.getState().setFormatNumberFn(formatNumberFnRef);
  });

  // return <I18nContext.Provider value={{
  //   formatNumber(value): string {
  //     return safelyFormatNumberWithFallback(numberFormatter, value);
  //   }
  // }}>{props.children}</I18nContext.Provider>;
  return <div>{props.children}</div>;
}
