export interface ValidatorListItemProps {
  validatorName: string;
  validatorImg: string;
  stakedAmount: number;
  rewardsAmount: number;
  symbol: string;
  onSetting?: () => void;
}
