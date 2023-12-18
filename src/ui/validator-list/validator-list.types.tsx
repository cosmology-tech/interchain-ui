import { ValidatorListItemProps } from "../validator-list-item/validator-list-item.types";

export interface ValidatorListProps {
  variant?: "card" | "table";
  list: ValidatorListItemProps[];
}
