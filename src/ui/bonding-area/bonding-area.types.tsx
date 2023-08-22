import { BondingCardProps } from "../bonding-card/bonding-card.types";
import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";
import { BondingListSmProps } from "../bonding-list-sm/bonding-list-sm.types";
import { BondingListProps } from "../bonding-list/bonding-list.types";
export interface BondingAreaProps {
  bondingCardList: BondingCardProps[];
  bondingList: BondingListProps;
  bondingListSm: BondingListSmProps;
}
