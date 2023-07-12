export interface TokenInputProps {
  progress?: number;
  symbol: string;
  denom?: string;
  available?: number | undefined;
  imgSrc: string;
  title?: string | undefined;
  hasProgressBar?: boolean;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: string) => void;
}
