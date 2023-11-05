import { onMount, useRef, useMetadata } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import {
  getCurrencyFormatter,
  safelyFormatNumberWithFallback,
} from "../../helpers/number";
import { store } from "../../models/store";
import { I18nProviderProps } from "./i18n-provider.types";
import { NumberFormatProps } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function I18nProvider(props: I18nProviderProps) {
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
        new BigNumber(subProps.value)
      );
    };
    store.getState().setFormatNumberFn(formatNumberFnRef);
  });

  return <div>{props.children}</div>;
}
