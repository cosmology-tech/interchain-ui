export type NftFeeItemProps = {
  feeName: string,
  amount: number | string | undefined;
  desc: string;
  show?: boolean;
  amountKey?: string;
}

export interface NftFeesProps {
  listFee?: number | string;
  royalities?: number | string;
  fairBurn?: number | string;
  proceeds?: number | string;
}
