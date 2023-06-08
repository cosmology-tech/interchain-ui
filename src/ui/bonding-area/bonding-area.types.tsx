import { BondingCardProps } from "../bonding-card/bonding-card.types";
import { BondingListItemProps } from "../bonding-list-item/bonding-list-item.types";
import { BondingListSmProps } from "../bonding-list-sm/bonding-list-sm.types";
export interface BondingAreaProps {
  bondingCardList: BondingCardProps[];
  bondingList: BondingListItemProps[];
  bondingListSm: BondingListSmProps;
}
