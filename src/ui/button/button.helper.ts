import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { Size } from "./button.css";

const paddingBySize: Record<Size, Sprinkles> = {
  xs: {
    px: "$4",
  },
  sm: {
    px: "$6",
  },
  md: {
    px: "$8",
  },
  lg: {
    px: "$10",
  },
};

export function getPaddings(size: Size): Sprinkles {
  return paddingBySize[size];
}
