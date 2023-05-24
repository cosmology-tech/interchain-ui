import { BaseComponentProps } from "../../models/components.model";

export interface PoolsHeaderProps {
  children: BaseComponentProps["children"];
  /**
   * Price
   */
  price: number;
  /**
   * Rewards
   */
  rewards: number;
  /**
   * $Rewards
   */
  $rewards: number;
}
