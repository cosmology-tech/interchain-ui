export interface BondingMoreProps {
  bondingName: string;
  available: number | string;
  onBond: (value: string) => void;
  isLoading?: boolean;
}
