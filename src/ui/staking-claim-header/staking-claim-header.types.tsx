export interface StakingClaimHeaderProps {
  stakedAmount: number;
  rewardsAmount: number;
  symbol: string;
  onClaim?: () => void;
}
