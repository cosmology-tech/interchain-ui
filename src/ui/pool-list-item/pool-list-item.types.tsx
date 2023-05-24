import { BaseComponentProps, BaseState } from "../../models/components.model";

export interface PoolListItemProps extends BaseComponentProps {
  /**
   * Token1
   */
  token1: {
    name: string
    imgSrc: string,
  },
  /**
   * Token2
   */
  token2: {
    name: string,
    imgSrc: string,
  },
  poolLiquidity: number,
  volume: number,
  fees: number,
  apr: number,
}

