export interface BondingMoreProps {
  bondingName: string;
  available: number | string;
  onBond: () => void;
  onChange: (value: string) => void;
  isLoading?: boolean;
}
