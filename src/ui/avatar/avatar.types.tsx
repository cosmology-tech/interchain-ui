import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

// Whether to display initials or plain background while avatar src is still loading
export type AvatarFallbackMode = "initials" | "bg";

export interface AvatarImageProps extends BaseComponentProps {
  src?: string;
  srcSet?: string;
  name: string;
  borderRadius?: Sprinkles["borderRadius"];
  loading?: "eager" | "lazy";
  ignoreFallback?: boolean;
  referrerPolicy?: string;
  crossOrigin?: string;
  sizes?: string;
  fallbackMode?: AvatarFallbackMode;
  onError?: (error?: any) => void;
  onLoad?: (event?: any) => void;
  getInitials?: (name: string) => string;
}

export interface AvatarNameProps extends BaseComponentProps {
  name: string;
  getInitials?: (name: string) => string;
  children?: any;
  ref?: any;
  showInitials?: boolean;
  attributes?: Sprinkles;
}

export type AvatarSize = "xs" | "2xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps
  extends AvatarImageProps,
    Omit<AvatarNameProps, "ref"> {
  size?: AvatarSize;
  rounded?: boolean;
  showBorder?: boolean;
  fallbackMode?: AvatarFallbackMode;
  borderColor?: Sprinkles["borderColor"];
  backgroundColor?: Sprinkles["backgroundColor"];
}

export type AvatarBadgePlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface AvatarBadgeProps extends BaseComponentProps {
  ref?: any;
  attributes?: any;
  size?: string;
  placement?: AvatarBadgePlacement;
  borderWidth?: Sprinkles["borderWidth"];
}
