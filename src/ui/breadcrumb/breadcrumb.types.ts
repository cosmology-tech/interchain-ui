import { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface BreadcrumbProps {
  links: BreadcrumbLink[];
  onItemClick: (href: string) => void;
  mt?: Sprinkles["mt"];
  mb?: Sprinkles["mb"];
  width?: Sprinkles["width"];
  gapLeft?: Sprinkles["gap"];
  gapRight?: Sprinkles["gap"];
  primaryColor?: Sprinkles["color"];
  secondaryColor?: Sprinkles["color"];
  separator?: string;
}

export interface BreadcrumbLink {
  name: string;
  href: string;
}

export type BreadcrumbItemProps = Pick<
  BreadcrumbProps,
  "onItemClick" | "gapLeft" | "separator" | "primaryColor" | "secondaryColor"
> &
  BreadcrumbLink & {
    isLast: boolean;
  };
