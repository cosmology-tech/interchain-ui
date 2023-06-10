import { BaseComponentProps } from "../../models/components.model";
import { PoolNameProps } from "../pool/components/pool-name/pool-name.types";

export interface PoolListItemProps extends PoolNameProps {
  id: string;
  poolLiquidity: number,
  volume: number,
  fees: number,
  apr: number,
}

