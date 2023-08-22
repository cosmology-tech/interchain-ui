import { ValidatorListItemProps } from "../validator-list-item/validator-list-item.types";

export interface ValidatorListProps {
  list: ValidatorListItemProps[];
  selfValidator: boolean;
}
