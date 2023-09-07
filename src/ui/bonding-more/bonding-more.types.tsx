export interface BondingMoreProps {
  bondingName: string;
  available: number | string;
  onBond: (event?: any) => void;
  onChange: (value: string) => void;
  isLoading?: boolean;
  value?: string;
}
