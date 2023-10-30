import type { BaseComponentProps } from "../../models/components.model";
import type { AvailableItem } from "../transfer-item/transfer-item.types";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type LiquidStakingToken = AvailableItem;

export interface LiquidStakingReward extends AvailableItem {
  rewardAmount: string;
}

type BottomLink = {
  href: string;
  label: string;
};

type OnChangePayload = {
  stakeToken: AvailableItem;
  stakeAmount: number;
};

export type RewardDescriptionItem = {
  title: string;
  subtitle: string;
  desc: string;
};

export interface LiquidStakingProps extends BaseComponentProps {
  options: Array<AvailableItem>;
  stakeToken?: AvailableItem | null;
  reward: LiquidStakingReward;
  bottomLink?: BottomLink;
  decimals?: number;
  descriptionList?: Array<RewardDescriptionItem>;
  isSubmitDisabled?: boolean;
  onChange?: (payload: OnChangePayload) => void;
  onSubmit: (event?: any) => void;
  // ==== Labels
  timeEstimateLabel: string;
  submitButtonLabel?: string;
  rewardLabel?: string;
  stakeLabel?: string;
  accordionLabel?: BaseComponentProps["children"];
  footerLabel?: BaseComponentProps["children"];
  // ==== Number format props
  precision?: number;
  // ==== Box props
  attributes?: Sprinkles;
  domAttributes?: any;
}
