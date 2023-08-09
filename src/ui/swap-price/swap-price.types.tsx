import { AvailableItem } from "../transfer-item/transfer-item.types";

export interface SwapPriceType {
  priceRate: string;
  dollarValue: string;
}

export type SwapDetailCoin = {
  logoUrl: string | undefined;
  symbol: string;
};

export type SwapPriceDetailRoute = {
  poolId: string;
  swapFee: string;
  baseLogo: string | undefined;
  baseSymbol: string;
  quoteLogo: string | undefined;
  quoteSymbol: string;
};

export type SwapPriceDetailRouteDetail = {
  tokenIn: SwapDetailCoin;
  routes: SwapPriceDetailRoute[];
  tokenOut: SwapDetailCoin;
};

export interface SwapPriceProps {
  hasRoute?: boolean;
  // price: SwapPriceType;
  priceImpact: string;
  swapFee: {
    percentage: string;
    value: string;
  };
  minimumReceived: string | undefined;
  // internal props
  fromItem: AvailableItem;
  toItem: AvailableItem;
  disabled?: boolean;
  fromAmount: string;
  toAmount: string;
}
