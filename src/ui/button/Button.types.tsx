import { BaseComponentProps, BaseState } from "../../models/components.model";
import type { Variants } from "./button.css";

export interface ButtonProps extends BaseComponentProps, Variants {
  disabled?: boolean;
}

export interface ButtonState extends BaseState {}
