import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";
import { AprType } from "../pool-list-item/pool-list-item.types";

export interface BondingListItemProps {
  title: string;
  superfluidApr: string;
  amount: number | string;
  totalApr: string;
  type: keyof AprType;
  onUnbond: BondingListItemSmProps["onUnbond"]
}
