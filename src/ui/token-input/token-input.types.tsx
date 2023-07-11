export interface TokenInputProps {
  progress: number;
  symbol: string;
  denom: string;
  available?: number;
  imgSrc: string;
  title?: string;
  hasProgressBar?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: string) => void;
}
