export interface TokenInputProps {
  progress?: number;
  amount?: string;
  symbol: string;
  denom?: string;
  available?: number | string | undefined;
  priceDisplayAmount: number;
  imgSrc: string;
  title?: string | undefined;
  hasProgressBar?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: string) => void;
}
