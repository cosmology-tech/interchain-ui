import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export interface BondingListSmProps {
  list: BondingListItemSmProps[];
  unbondedBalance: number | string;
  unbondedShares: number | string;
  bondingName: string;
  onBond: BondingListItemSmProps["onBond"]
  onUnbond: BondingListItemSmProps["onUnbond"]
}
