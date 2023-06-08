import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export interface BondingListSmProps {
  list: BondingListItemSmProps[];
  unbondedAmt: number;
  unbondedShares: number;
}
