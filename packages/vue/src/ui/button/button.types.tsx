import { BaseComponentProps, BaseState } from "../../models/components.model";
import { Intent } from "../../models/system.model";

type ButtonVariant = "outlined" | "solid" | "ghost" | "unstyled";

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  intent?: Intent;
  outline?: boolean;
  disabled?: boolean;
}

export interface ButtonState extends BaseState {}
