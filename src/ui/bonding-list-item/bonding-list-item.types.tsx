export interface BondingListItemProps {
  title: string;
  apr: string;
  amount: number;
  per: string;
  onUnbond: (e: MouseEvent) => void;
}
