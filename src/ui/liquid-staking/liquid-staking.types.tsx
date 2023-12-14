import type { BaseComponentProps } from "../../models/components.model";
import type { AvailableItem } from "../transfer-item/transfer-item.types";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type LiquidStakingToken = AvailableItem;

export interface LiquidStakingReward extends AvailableItem {
  rewardAmount: number;
}

type BottomLink = {
  href: string;
  label: string;
};

export type RewardDescriptionItem = {
  title: string;
  subtitle: string;
  desc: string;
};

export interface LiquidStakingProps extends BaseComponentProps {
  stakeToken?: AvailableItem | null;
  stakeAmount: number;
  reward: LiquidStakingReward;
  bottomLink?: BottomLink;
  decimals?: number;
  descriptionList?: Array<RewardDescriptionItem>;
  isSubmitDisabled?: boolean;
  onChange?: (stakeAmount: number) => void;
  onSubmit: (event?: any) => void;
  // Half and max buttons
  halfButtonLabel?: string;
  maxButtonLabel?: string;
  onHalf?: () => void;
  onMax?: () => void;
  // ==== Labels
  timeEstimateLabel: string;
  submitButtonLabel?: string;
  rewardLabel?: string;
  stakeLabel?: string;
  availableLabel?: string;
  accordionLabel?: BaseComponentProps["children"];
  footerLabel?: BaseComponentProps["children"];
  // ==== Custom elements
  renderSubmitButton?: (props?: any) => BaseComponentProps["children"];
  renderAccordionButton?: (props?: any) => BaseComponentProps["children"];
  // ==== Number format props
  precision?: number;
  // ==== Box props
  attributes?: Sprinkles;
  domAttributes?: any;
}
