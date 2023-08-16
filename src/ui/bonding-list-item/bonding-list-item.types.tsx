export interface BondingListItemProps {
  title: string;
  superfluidApr: string;
  amount: number | string;
  totalApr: string;
  onUnbond: () => void;
  isLoading?:boolean;
}
