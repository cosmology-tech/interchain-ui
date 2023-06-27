import { ButtonProps } from "../button/button.types";
import type { IconProps } from "../icon/icon.types";

type OmittedProps = "leftIcon" | "rightIcon";

interface BaseeButtonProps extends Omit<ButtonProps, OmittedProps> {}

export interface IconButtonProps extends BaseeButtonProps {
  isRound?: boolean;
  icon: IconProps["name"];
}
