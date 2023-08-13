import { ResponseInfo } from "../add-liquidity/add-liquidity.types";
import { APR, AprType } from "../pool-list-item/pool-list-item.types";

export type OnBondDetail = {
  type: keyof AprType;
  value: string;
};
export type OnUnBondDetail = {
  type: keyof AprType;
};
export interface BondingListItemSmProps {
  title: string;
  bondedValue: APR["bondedShares"];
  bondedShares: APR["bondedShares"];
  totalApr: APR["totalApr"];

  bondingName?: string;
  type: keyof AprType;
  onBond?: (detail: OnBondDetail) => ResponseInfo;
  onUnbond?: (detail: OnUnBondDetail) => ResponseInfo;
}
