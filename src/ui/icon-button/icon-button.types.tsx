import { ButtonProps } from "../button/button.types";
import type { IconProps } from "../icon/icon.types";

type OmittedProps = "leftIcon" | "rightIcon";

interface BaseButtonProps extends Omit<ButtonProps, OmittedProps> {}

export interface IconButtonProps extends BaseButtonProps {
  isRound?: boolean;
  icon: IconProps["name"];
}
